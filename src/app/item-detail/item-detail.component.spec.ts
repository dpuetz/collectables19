import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { ItemDetailComponent } from './item-detail.component';
import { ItemsService } from '../common/items.service';
import { CartService } from '../common/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IItem } from '../common/IItem.model';

describe('ItemDetailComponent', () => {
	//declare component
	let component: ItemDetailComponent;
	let fixture: ComponentFixture<ItemDetailComponent>;

	//declare services
	let itemsService: jasmine.SpyObj<ItemsService>;
	let cartService: jasmine.SpyObj<CartService>;
	let router: jasmine.SpyObj<Router>;
	let activatedRoute: ActivatedRoute;

	//set data
	const mockItem: IItem = { id: 1, name: 'Item 1', description: 'Description 1', price: 10, category: 'Category 1', catgegoryIcon: true, imageUrl: 'image1.jpg' };

	beforeEach(async () => {
		//create spies
		const itemsServiceSpy = jasmine.createSpyObj('ItemsService', ['getItem']);
		const cartServiceSpy = jasmine.createSpyObj('CartService', ['add']);
		const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

		//create test bed
		TestBed.configureTestingModule({
			imports: [ItemDetailComponent],
			providers: [
				{ provide: ItemsService, useValue: itemsServiceSpy },
				{ provide: CartService, useValue: cartServiceSpy },
				{ provide: Router, useValue: routerSpy },
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: { params: { id: mockItem.id } }
					}
				}
			],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();

		//create component
		fixture = TestBed.createComponent(ItemDetailComponent);
		component = fixture.componentInstance;

		//inject services into testBed
		itemsService = TestBed.inject(ItemsService) as jasmine.SpyObj<ItemsService>;
		cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
		router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
		activatedRoute = TestBed.inject(ActivatedRoute);

		// Mock the return values
		itemsService.getItem.and.returnValue(of(mockItem));
		cartService.add.and.returnValue(of(null));
	});

	afterEach(() => {
		component.ngOnDestroy();
	});

	it('should test ItemDetailComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize item on ngOnInit', () => {
		fixture.detectChanges();
		expect(component.item).toEqual(mockItem);
		expect(itemsService.getItem).toHaveBeenCalledWith(mockItem.id);
	});

	it('should navigate to catalog if no itemId is present', () => {
		const routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
		TestBed.inject(ActivatedRoute).snapshot.params['id'] = undefined;
		component.ngOnInit();
		expect(routerSpy.navigate).toHaveBeenCalledWith(['/catalog']);
	});

	it('should add item to cart and navigate to catalog on buy', () => {
		component.item = mockItem;
		component.buy();
		expect(cartService.add).toHaveBeenCalledWith(mockItem);
		expect(router.navigate).toHaveBeenCalledWith(['/catalog']);
	});

	it('should unsubscribe from all subscriptions on ngOnDestroy', () => {
		const subscriptionSpy = spyOn(component.subscriptions, 'unsubscribe');
		component.ngOnDestroy();
		expect(subscriptionSpy).toHaveBeenCalled();
	});

	it('should show item imageurl in template', () => {
		component.item = mockItem;
		fixture.detectChanges();
		const compiled = fixture.nativeElement;
		const img = compiled.querySelector('.itemImage');
		let found = false;
		if (img && img.src && img.src.indexOf(mockItem.imageUrl) > -1) {
			found = true;
		}
		expect(found).toBe(true);
	});

});
