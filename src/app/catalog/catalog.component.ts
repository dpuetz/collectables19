import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IItem } from '../common/IItem.model';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { combineLatest, map, Subscription } from 'rxjs';
import { ItemsService } from '../common/items.service';
import { ItemsListComponent } from '../items-list/items-list.component';

@Component({
	standalone: true,
	imports: [CommonModule, NgOptimizedImage, ItemsListComponent],
	selector: 'app-catalog',
	templateUrl: './catalog.component.html',
	styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy {
	items: IItem[] = [];
	filteredItems: IItem[] = [];
	filter: string = '';
	subscriptions: Subscription = new Subscription();

	constructor(
		private itemsService: ItemsService,
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		this.subscriptions.add(
			combineLatest([
				this.itemsService.getAllItems(),
				this.route.queryParams
			]).pipe(
				map(([items, params]) => {
					this.items = items;
					this.filter = params['filter'] ?? 'all';
					this.setFilteredItems();
				})
			).subscribe()
		);
	}

	setFilter(filter: string) {
		this.filter = filter;
		this.setFilteredItems();
	}

	setFilteredItems() {
		this.filteredItems = this.filter === 'all' ? this.items : this.items.filter((item: IItem) => item.category === this.filter);
	}

	getCategoryIcons() {
		const ar = this.items.filter(
			(item: IItem) => item.catgegoryIcon === true
		);
		const newItem: IItem = { id: 0, name: '', description: '', price: 0, category: 'all', catgegoryIcon: true, imageUrl: 'homesquare.jpg' };
		ar.push(newItem)
		return ar;
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
