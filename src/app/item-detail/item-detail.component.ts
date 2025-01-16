import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IItem } from '../common/IItem.model';
import { ItemsService } from '../common/items.service';
import { CartService } from '../common/cart.service';

@Component({
	standalone: true,
	selector: 'app-item-detail',
	imports: [CommonModule],
	templateUrl: './item-detail.component.html',
	styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit, OnDestroy {
	@Input() itemId: number = 0;
	item!: IItem;
	subscriptions: Subscription = new Subscription();
	imageWidth: number = 80;
	readonly imageWidthMin: number = 80;
	readonly imageWidthMax: number = 100;

	constructor(private route: ActivatedRoute,
		private cartService: CartService,
		private router: Router,
		private itemsService: ItemsService
	) { }

	ngOnInit() {
		const itemId = this.route.snapshot.params['id'];
		if (!itemId) {
			this.router.navigate(['/catalog']);
		}
		this.subscriptions.add(
			this.itemsService.getItem(itemId).subscribe(item => {
				this.item = item;
			}));
	}

	buy() {
		this.subscriptions.add(
			this.cartService.add(this.item).subscribe((cart) => {
				this.router.navigate(['/catalog']);
			}));
	}

	resizeImage() {
		if (this.imageWidth >= this.imageWidthMax) {
			this.imageWidth = this.imageWidthMin;
		} else {
			this.imageWidth += 10;
		}
	}

	getImageWidth(): string {
		return this.imageWidth.toString() + "%";
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
