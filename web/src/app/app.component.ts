import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, PrimaveraService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
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

    expand(event) {
        const dataset = event.target.closest('button').dataset;
        document.querySelector(dataset.target).classList.toggle(dataset.toggle);
    }

    logout() {
        this.primavera.stopInterval();
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
