import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, PrimaveraService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private primavera: PrimaveraService,
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    collapse(event) {
        const elem = event.target.closest('div.navbar-collapse');
        elem.classList.toggle('collapse');
    }

    isHome() {
        console.log(this.router.url);
        return /\/$|\/\?[^\?]*/g.test(this.router.url);
    }

    expand(event) {
        const dataset = event.target.closest('button').dataset;
        document.querySelector(dataset.target).classList.toggle(dataset.toggle);
    }

    ngOnInit() {
        if (this.currentUser) {
            this.primavera.getToken();
            this.primavera.startInterval();
        }
    }

    logout() {
        this.primavera.stopInterval();
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
