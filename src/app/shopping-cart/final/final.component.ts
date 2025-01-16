import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IItem } from '../../common/IItem.model';
import { CartService } from '../../common/cart.service';

@Component({
	standalone: true,
	selector: 'app-final',
	imports: [CommonModule, NgOptimizedImage, FormsModule],
	templateUrl: './final.component.html',
	styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit, OnDestroy {
	cart: IItem[] = [];
	cartTotal: number = 0;
	showNoItems: boolean = false;
	subscriptions: Subscription = new Subscription();

	constructor(
		private cartService: CartService,
		private router: Router,
	) { }

	ngOnInit() {
		this.subscriptions.add(
			this.cartService.getCart().subscribe(cart => {
				this.cart = cart;
				this.calculateTotal();
				if (this.cart.length === 0) {
					this.showNoItems = true;
				}
			}));
	}

	calculateTotal() {
		this.cartTotal = this.cartService.getCartTotal();
	}

	checkout() {
		this.cartService.checkout();
		this.router.navigate(['/thankyou']);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
