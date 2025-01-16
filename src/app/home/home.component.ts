import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IItem } from '../common/IItem.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ItemsService } from '../common/items.service';

@Component({
	standalone: true,
	imports: [RouterLink, CommonModule],
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
	items: IItem[] = [];
	subscriptions: Subscription = new Subscription();

	constructor(
		private itemsService: ItemsService,
	) { }

	ngOnInit() {
		this.subscriptions.add(
			this.itemsService.getAllItems().subscribe(items => {
				this.items = items.filter(item => item.catgegoryIcon);
			})
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
