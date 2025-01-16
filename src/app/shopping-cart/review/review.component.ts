import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../common/cart.service';
import { SettingsService } from '../../common/setting.service';
import { IItem } from '../../common/IItem.model';
import { ItemsListComponent } from '../../items-list/items-list.component';

@Component({
	standalone: true,
	selector: 'app-review',
	imports: [CommonModule, RouterLink, ItemsListComponent],
	templateUrl: './review.component.html',
	styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit, OnDestroy {
	cart: IItem[] = [];
	cartTotal: number = 0;
	showNoItems: boolean = false;
	subscriptions: Subscription = new Subscription();
	urlNext:string = '/cart/final';

	constructor(
		private cartService: CartService,
		private settingsService: SettingsService,
		private router: Router,
	) { }

	ngOnInit() {
		this.subscriptions.add(
			this.cartService.getCart().subscribe(cart => {
				this.cart = cart;
				this.showNoItems = this.cart.length === 0 ? true : false;
			}));
	}

	remove(item: IItem) {
		this.subscriptions.add(
			this.cartService.remove(item).subscribe(cart => {
				this.cart = cart;
			})
		);
	}

	review() {
		this.settingsService.LoginGoNextUrl = this.urlNext;
		this.router.navigate([this.urlNext]);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
