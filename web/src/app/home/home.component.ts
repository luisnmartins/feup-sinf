import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User, Order } from '@app/_models';
import { UserService, AuthenticationService, PrimaveraService } from '@app/_services';

@Component({ templateUrl: 'home.component.html',
             styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    ecl: Order[] = [];
    ecf: Order[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private primavera: PrimaveraService,
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
        this.getAllECL();
        this.getAllECF();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
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

    private getAllECL() {
        this.primavera.getECL().subscribe(ecl => {
            this.ecl = this.primavera.parseOrderLines(ecl.DataSet.Table);
        });
    }

    private getAllECF() {
        this.primavera.getECF().subscribe(ecf => {
            this.ecf = this.primavera.parseOrderLines(ecf.DataSet.Table);
        });
    }
}
