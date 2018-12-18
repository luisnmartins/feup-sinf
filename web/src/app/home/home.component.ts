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
        // while(!this.currentToken);
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
        this.currentTokenSubscription.unsubscribe();
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
        this.ecl = this.primavera.parseOrderLines(ecl.DataSet.Table);
        this.loadingCustomer = false;
    }

    private async getAllECF() {
        this.loadingSupplier = true;
        const ecf = await this.primavera.getECF().toPromise();
        this.ecf = this.primavera.parseOrderLines(ecf.DataSet.Table);
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
