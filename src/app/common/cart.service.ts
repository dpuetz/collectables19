import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IItem } from './IItem.model';

@Injectable({
	providedIn: 'root',
})

export class CartService {
	private defaultItems: IItem[] =
		[
			{
				id: 1,
				name: 'Blue Crackle Glass',
				description: 'Hat-shaped bowl and ruffle-edged bowl.',
				price: 20.00,
				category: 'bowls',
				catgegoryIcon: false,
				imageUrl: 'Blue Crackle Glass.jpg',
			},
			{
				id: 2,
				name: 'Green Beehive Bowl',
				description: 'Green fired-on beehive-patterned bowl.',
				price: 25.00,
				category: 'bowls',
				catgegoryIcon: true,
				imageUrl: 'Green Beehive Bowl.jpg',
			},
			{
				id: 3,
				name: 'Peacock Pattern Bowl',
				description: 'EAPG bowl with peacock feathers pattern.',
				price: 30.00,
				category: 'bowls',
				catgegoryIcon: false,
				imageUrl: 'Peacock Pattern Bowl.jpg',
			},

			{
				id: 4,
				name: 'Pink Doric Bowl',
				description: 'Pink depression glass oval bowl. Doric pattern.',
				price: 20.00,
				category: 'bowls',
				catgegoryIcon: false,
				imageUrl: 'Pink Doric Bowl.jpg',
			},
			{
				id: 5,
				name: 'Two-Panel Oval Bowl',
				description: 'Apple-green EAPG oval bowl.',
				price: 40.00,
				category: 'bowls',
				catgegoryIcon: false,
				imageUrl: 'Two-Panel Oval Bowl.jpg',
			},
			{
				id: 6,
				name: 'Delphite Coffee',
				description: 'Delphite blue coffee canister',
				price: 100.00,
				category: 'canisters',
				catgegoryIcon: true,
				imageUrl: 'Delphite Coffee.jpg',
			},
			{
				id: 7,
				name: 'Hazel Atlas Flour',
				description: 'Green fired-on Hazel Atlas Flour canister.',
				price: 120.00,
				category: 'canisters',
				catgegoryIcon: false,
				imageUrl: 'Hazel Atlas Flour.jpg',
			},
			{
				id: 8,
				name: 'Hazel Atlas Tea',
				description: 'Green fired-on Hazel Atlas Tea canister.',
				price: 115.00,
				category: 'canisters',
				catgegoryIcon: false,
				imageUrl: 'Hazel Atlas Tea.jpg',
			},
			{
				id: 9,
				name: 'Red Flour',
				description: 'Fired-on red flour Canister.',
				price: 80.00,
				category: 'canisters',
				catgegoryIcon: false,
				imageUrl: 'Red Flour.jpg',
			},
			{
				id: 10,
				name: 'Jadite Tea',
				description: 'Jadite Tea Canister',
				price: 130.00,
				category: 'canisters',
				catgegoryIcon: false,
				imageUrl: 'Jadite Tea.jpg',
			}]
	// private cart: BehaviorSubject<IItem[]> = new BehaviorSubject<IItem[]>(this.defaultItems);
	private cart: BehaviorSubject<IItem[] > = new BehaviorSubject<IItem[]>([]);

	getCart(): Observable<IItem[] > {
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
