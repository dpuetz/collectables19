import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';
import { ItemsService } from '../common/items.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { IItem } from '../common/IItem.model';

describe('CatalogComponent', () => {
	let component: CatalogComponent;
	let fixture: ComponentFixture<CatalogComponent>;
	let itemsService: jasmine.SpyObj<ItemsService>;

	const items = [
		{ id: 1, name: 'Blue Crackle Glass', description: '', price: 10, category: 'bowls', catgegoryIcon: true, imageUrl: '' },
		{ id: 2, name: 'Green Beehive Bowl', description: '', price: 15, category: 'bowls', catgegoryIcon: false, imageUrl: '' },
		{ id: 7, name: 'Hazel Atlas Flour', description: 'Green fired-on Hazel Atlas Flour canister.', price: 120.00, category: 'canisters', catgegoryIcon: false, imageUrl: 'Hazel Atlas Flour.jpg', },
	] as IItem[];

	beforeEach(async () => {
		const itemsServiceSpy = jasmine.createSpyObj('itemsService', ['getAllItems']);
		await TestBed.configureTestingModule({
			imports: [CatalogComponent],
			providers: [
				{ provide: ItemsService, useValue: itemsServiceSpy },
				{ provide: ActivatedRoute, useValue: { queryParams: of({ filter: 'all' }) } },
			]
		})
			.compileComponents();

		fixture = TestBed.createComponent(CatalogComponent);
		component = fixture.componentInstance;
		itemsService = TestBed.inject(ItemsService) as jasmine.SpyObj<ItemsService>;
		itemsService.getAllItems.and.returnValue(of(items));
	});
	it('should test CatalogComponent', () => {
		expect(1).toBe(1);
	})
	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should setFilteredItems on init', () => {
		spyOn(component, 'setFilteredItems');
		component.ngOnInit();
		expect(component.setFilteredItems).toHaveBeenCalled();
	})
	it('should get category icons', () => {
		component.ngOnInit();
		const icons = component.getCategoryIcons();
		expect(icons.length).toBe(2); // 1 from initial items + 1 newItem
		expect(icons[0].id).toBe(1);
		expect(icons[0].category).toBe('bowls');
		expect(icons[1].category).toBe('all');
	});
	it('should setFilteredItems', () => {
		component.ngOnInit();
		const icons = component.getCategoryIcons();
		component.filter = 'all'
		component.setFilteredItems();
		expect(component.filteredItems.length).toBe(3);
		component.filter = 'canisters'
		component.setFilteredItems();
		expect(component.filteredItems.length).toBe(1);
	});
	it('should set filter and call setFilteredItems', () => {
		spyOn(component, 'setFilteredItems');
		component.setFilter('bowls');
		expect(component.filter).toBe('bowls');
		expect(component.setFilteredItems).toHaveBeenCalled();
	});
	it('should unsubscribe on ngOnDestroy', () => {
		spyOn(component.subscriptions, 'unsubscribe');
		component.ngOnDestroy();
		expect(component.subscriptions.unsubscribe).toHaveBeenCalled();
	});
	it('should display filtered items in the template', () => {
		component.filteredItems = items;
		fixture.detectChanges();
		const compiled = fixture.nativeElement;
		expect(compiled.querySelectorAll('.itemDiv').length).toBe(items.length);
	});
});
