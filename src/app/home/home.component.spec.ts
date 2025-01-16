import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsService } from '../common/items.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { IItem } from '../common/IItem.model';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;
	let itemsService: jasmine.SpyObj<ItemsService>;
	const mockItems = [
		{ id: 1, name: 'Blue Crackle Glass', description: '', price: 10, category: 'bowls', catgegoryIcon: true, imageUrl: '' },
		{ id: 2, name: 'Green Beehive Bowl', description: '', price: 15, category: 'shakers', catgegoryIcon: true, imageUrl: '' },
		{ id: 7, name: 'Hazel Atlas Flour', description: 'Green fired-on Hazel Atlas Flour canister.', price: 120.00, category: 'canisters', catgegoryIcon: true, imageUrl: 'Hazel Atlas Flour.jpg', },
	] as IItem[];

	beforeEach(async () => {
		const itemsServiceSpy = jasmine.createSpyObj('itemsService', ['getAllItems']);
		await TestBed.configureTestingModule({
			imports: [HomeComponent],
			providers: [
				{ provide: ItemsService, useValue: itemsServiceSpy },
				{ provide: ActivatedRoute, useValue: { queryParams: of({ filter: 'all' }) } },
			]
		}).compileComponents();

		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		itemsService = TestBed.inject(ItemsService) as jasmine.SpyObj<ItemsService>;
		itemsService.getAllItems.and.returnValue(of(mockItems));
		// fixture.detectChanges();
	});
	afterEach(() => {
		component.ngOnDestroy();
	})
	it('should test HomeComponent', () => {
		expect(1).toBe(1);
	})
	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should get items on init', () => {
		fixture.detectChanges();
		expect(component.items.length).toBe(3);
		expect(component.items).toEqual(mockItems);
	})
	it('should unsubscribe on ngOnDestroy', () => {
		spyOn(component.subscriptions, 'unsubscribe');
		component.ngOnDestroy();
		expect(component.subscriptions.unsubscribe).toHaveBeenCalled();
	});
	it('should display filtered items in the template', () => {
		component.items = mockItems;
		fixture.detectChanges();
		const compiled = fixture.nativeElement;
		expect(compiled.querySelectorAll('.itemImage').length).toBe(mockItems.length);
	});
});
