import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IItem } from '../common/IItem.model';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
	standalone:true,
	selector: 'app-items-list',
	imports: [CommonModule, NgOptimizedImage],
	templateUrl: './items-list.component.html',
	styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent {
	@Input() items: IItem[] = [];
	@Input() removable: boolean = false;
	@Output() removeItem: EventEmitter<IItem> = new EventEmitter<IItem>;

	constructor(
		private router: Router,
	) { }

	remove(item: IItem) {
		this.removeItem.emit(item);
	}

	imageClicked(item: IItem) {
		if (!this.removable) {
			this.router.navigate(['/detail', item.id]);
		}
	}
}
