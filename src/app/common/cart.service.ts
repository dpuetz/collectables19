import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IItem } from './IItem.model';

@Injectable({
	providedIn: 'root',
})

export class CartService {
	private cart: BehaviorSubject<IItem[]> = new BehaviorSubject<IItem[]>([]);

	getCart(): Observable<IItem[]> {
		return this.cart.asObservable();
	}

	add(item: IItem): Observable<IItem[] | null> {
		const existingItem = this.cart.getValue().find((i) => i.id === item.id);
		if (!existingItem) {
			const newCart = [...this.cart.getValue(), item];
			this.cart.next(newCart);
		}
		return this.cart.asObservable();
	}

	remove(item: IItem) {
		let newCart = this.cart.getValue().filter((i) => i.id !== item.id);
		this.cart.next(newCart);
		return this.getCart();
	}

	getCartTotal() {
		return this.cart.getValue().reduce((acc, item) => acc + item.price, 0);
	}

	checkout() {
		this.cart.next([]);
	}
}
