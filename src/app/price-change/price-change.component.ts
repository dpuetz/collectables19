import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../common/items.service';
import { CommonModule } from '@angular/common';
import { IItem } from '../common/IItem.model';

@Component({
	standalone: true,
	imports: [CommonModule, FormsModule],
	selector: 'app-price-change',
	templateUrl: './price-change.component.html',
	styleUrls: ['./price-change.component.css']
})
export class PriceChangeComponent implements OnInit, OnDestroy {
	subscriptions: Subscription = new Subscription();
	items: IItem[] = [];
	newItem: IItem = { id: 0, name: '', price: 0, description: '', category: '', catgegoryIcon: false, imageUrl: '' };
	selectedItem: IItem = this.newItem;
	initialPrice: number = 0;

	constructor(private itemsService: ItemsService) { }

	ngOnInit() {
		this.subscriptions.add(
			this.itemsService.getAllItems().subscribe({
				next: (items) => {
					this.items = items;
				},
				error: (err) => console.log(err),
			}));
	}

	onItemChange() {
		this.setInitialPrice();
	}

	setInitialPrice() {
		this.initialPrice = this.selectedItem.price;
	}	

	formatPrice() {
		this.selectedItem.price = Math.round(this.selectedItem.price * 100) / 100;
	}

	save() {
		console.log(this.selectedItem, 'saving...');
		this.subscriptions.add(
			this.itemsService.saveItem(this.selectedItem).subscribe({
				next: (item) => {
					this.setInitialPrice();
				},
				error: (err) => console.log(err),
			})
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
