import { MapDialogComponent } from './../map-dialog/map-dialog.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User, Order, TokenRes } from '@app/_models';
import { UserService, AuthenticationService, PrimaveraService } from '@app/_services';
import { isNumber } from 'util';

@Component({ templateUrl: 'home.component.html',
             styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    currentToken: TokenRes;
    currentTokenSubscription: Subscription;
    users: User[] = [];
    ecl: Order[] = [];
    ecf: Order[] = [];
    route: number;
    loadingCustomer = true;
    loadingSupplier = true;
    loadingRoute = true;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private primavera: PrimaveraService,
        private dialog: MatDialog,
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        this.currentTokenSubscription = this.primavera.currentToken.subscribe(token => {
            this.currentToken = token;
            console.log('TOKEN ON SUBSCRIBE: ', this.currentToken);
            if (this.currentToken != null) {
                this.loadInfo();
                this.getRoute();
            }
        });
    }

    ngOnInit() {
        // if (this.currentToken) {
        //     this.loadInfo();
        // }
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
        this.currentTokenSubscription.unsubscribe();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(MapDialogComponent, {
            width: '250px',
            data: { name: 'name', animal: 'my spirit animal' }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers();
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    async loadInfo() {
        await this.getAllECL();
        await this.getAllECF();
    }

    private async getAllECL() {
        this.loadingCustomer = true;
        const ecl = await this.primavera.getECL().toPromise();
        this.ecl = this.primavera.parseOrderLines(ecl.DataSet.Table).filter(function (el) {
            return el != null;
        });
        console.log(this.ecl);
        this.loadingCustomer = false;
    }

    private async getAllECF() {
        this.loadingSupplier = true;
        const ecf = await this.primavera.getECF().toPromise();
        this.ecf = this.primavera.parseOrderLines(ecf.DataSet.Table).filter(function (el) {
            return el != null;
        });
        this.loadingSupplier = false;
    }

    private getRoute() {
        this.loadingRoute = true;
        this.primavera.getRoute().subscribe(route => {
            if (isNumber(route)) {
                this.route = route;
            } else {
                this.route = route.length;
            }
            this.loadingRoute = false;
        });
    }

    logout() {
        this.primavera.stopInterval();
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
