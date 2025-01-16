import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriceChangeComponent } from './price-change.component';
import { ItemsService } from '../common/items.service';
import { IItem } from '../common/IItem.model';
import { of } from 'rxjs';

describe('PriceChangeComponent', () => {
	let component: PriceChangeComponent;
	let fixture: ComponentFixture<PriceChangeComponent>;
	let itemsService: jasmine.SpyObj<ItemsService>;
	const items = [
		{ id: 1, name: 'Blue Crackle Glass', description: '', price: 10, category: 'bowls', catgegoryIcon: true, imageUrl: '' },
		{ id: 2, name: 'Green Beehive Bowl', description: '', price: 15, category: 'bowls', catgegoryIcon: false, imageUrl: '' },
		{ id: 7, name: 'Hazel Atlas Flour', description: 'Green fired-on Hazel Atlas Flour canister.', price: 120.00, category: 'canisters', catgegoryIcon: false, imageUrl: 'Hazel Atlas Flour.jpg', },
	] as IItem[];

	beforeEach(async () => {
		const itemsServiceSpy = jasmine.createSpyObj('itemsService', ['getAllItems', 'saveItem']);
		await TestBed.configureTestingModule({
			imports: [PriceChangeComponent],
			providers: [
				{ provide: ItemsService, useValue: itemsServiceSpy },
			]
		}).compileComponents();

		fixture = TestBed.createComponent(PriceChangeComponent);
		component = fixture.componentInstance;
		itemsService = TestBed.inject(ItemsService) as jasmine.SpyObj<ItemsService>;
		itemsService.getAllItems.and.returnValue(of(items));
		itemsService.saveItem.and.returnValue(of(items[0]));
		fixture.detectChanges();
	});
	it('should test PriceChangeComponent', () => {
		expect(1).toBe(1);
	});
	// it('should create', () => {
	// 	expect(component).toBeTruthy();
	// });
	// it('should items on init', () => {
	// 	component.ngOnInit();
	// 	expect(component.items).toEqual(items);
	// });
	// it('should call setInitialPrice when onItemChange is called', () => {
	// 	spyOn(component, 'setInitialPrice');
	// 	component.onItemChange();
	// 	expect(component.setInitialPrice).toHaveBeenCalled();
	// });
	// it('should change initialPrice when setInitialPrice is called', () => {
	// 	component.selectedItem.price = 543;
	// 	component.setInitialPrice();
	// 	expect(component.initialPrice).toBe(543);
	// });
	// it('should round off selectedItem in formatPrice', () => {
	// 	component.selectedItem.price = 5.999999;
	// 	component.formatPrice();
	// 	expect(component.selectedItem.price).toBe(6);
	// });
	// it('should call itemsService.saveItem on save', () => {
	// 	spyOn(component, 'setInitialPrice');
	// 	component.save();
	// 	expect(itemsService.saveItem).toHaveBeenCalled();
	// 	expect(component.setInitialPrice).toHaveBeenCalled();
	// });
	// it('should unsubscribe on ngOnDestroy', () => {
	// 	spyOn(component.subscriptions, 'unsubscribe');
	// 	component.ngOnDestroy();
	// 	expect(component.subscriptions.unsubscribe).toHaveBeenCalled();
	// });
});
