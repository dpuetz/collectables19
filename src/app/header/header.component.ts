import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { UserService } from '../login/user.service';
import { IUser } from '../login/user.model';

import { Subscription } from 'rxjs';
import { CartService } from '../common/cart.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
	user: IUser | null = null;
	subscriptions: Subscription = new Subscription();
	numberCartItems: number = 0;
	constructor(
		private userService: UserService,
		private router: Router,
		private cartService: CartService,
	) { }

	ngOnInit() {
		this.subscriptions.add(
			this.userService.getUser().subscribe(user => this.user = user));
		this.subscriptions.add(
			this.cartService.getCart().subscribe(cart => this.numberCartItems = cart.length));
	}
	isLoggedIn(): boolean {
		return this.userService.isLoggedIn();
	}

	isAdmin(): boolean {
		return this.userService.isAdmin();
	}

	logOut() {
		this.userService.logOut();
		this.toggleNavbar();
		this.router.navigate(['/home']);
	}

	toggleNavbar() {
		const navbarToggle = document.querySelector('.navbar-toggler') as HTMLElement;
		if (navbarToggle.getAttribute('aria-expanded') === 'true') {
			navbarToggle.click();
		}
	}
	
	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
