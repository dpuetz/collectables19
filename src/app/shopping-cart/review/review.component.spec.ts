import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CartService } from '../../common/cart.service';
import { of } from 'rxjs';
import { ReviewComponent } from './review.component';
import { SettingsService } from '../../common/setting.service';
import { HttpTestingController } from '@angular/common/http/testing';

describe('FinalComponent', () => {
	//declare component
	let component: ReviewComponent;
	let fixture: ComponentFixture<ReviewComponent>;

	//declare services
	let cartService: jasmine.SpyObj<CartService>;
	let settingsService: jasmine.SpyObj<SettingsService>;
	let router: jasmine.SpyObj<Router>;

	//set data
	const mockData = [{ id: 1, name: 'Blue Crackle Glass', description: 'Hat-shaped bowl and ruffle-edged bowl.', price: 20.00, category: 'bowls', catgegoryIcon: false, imageUrl: 'Blue Crackle Glass.jpg', },
	{ id: 2, name: 'Green Beehive Bowl', description: 'Green fired-on beehive-patterned bowl.', price: 25.00, category: 'bowls', catgegoryIcon: true, imageUrl: 'Green Beehive Bowl.jpg', },
	{ id: 3, name: 'Peacock Pattern Bowl', description: 'EAPG bowl with peacock feathers pattern.', price: 30.00, category: 'bowls', catgegoryIcon: false, imageUrl: 'Peacock Pattern Bowl.jpg', }];
	const mockCartTotal = 75;
	const mockItem = { id: 1, name: 'Blue Crackle Glass', description: 'Hat-shaped bowl and ruffle-edged bowl.', price: 20.00, category: 'bowls', catgegoryIcon: false, imageUrl: 'Blue Crackle Glass.jpg', };

	beforeEach(async () => {
		//create spies
		const cartServiceSpy = jasmine.createSpyObj('CartService', ['getCart', 'remove']);
		const settingsServiceSpy = jasmine.createSpyObj('SettingsService', ['']);
		const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

		//create test bed
		TestBed.configureTestingModule({
			imports: [ReviewComponent],
			providers: [
				{ provide: CartService, useValue: cartServiceSpy },
				{ provide: SettingsService, useValue: settingsServiceSpy },
				{ provide: Router, useValue: routerSpy },
				{ provide: ActivatedRoute, useValue: {} },
			],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();

		//create component
		fixture = TestBed.createComponent(ReviewComponent);
		component = fixture.componentInstance;

		//inject services into testBed
		cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
		settingsService = TestBed.inject(SettingsService) as jasmine.SpyObj<SettingsService>;
		router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
	});

	afterEach(() => {
		component.ngOnDestroy();
	});

	it('should create ReviewComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should have default values at start', () => {
		expect(component.cart).toEqual([]);
		expect(component.cartTotal).toBe(0);
		expect(component.showNoItems).toBeFalse();
	});

	it('should set cart items on ngOnInit', () => {
		cartService.getCart.and.returnValue(of(mockData));
		component.ngOnInit();
		expect(component.cart.length).toBe(mockData.length);
	});

	it('should set showNoItems to false', () => {
		component.showNoItems = true;
		cartService.getCart.and.returnValue(of(mockData));
		component.ngOnInit();
		expect(component.showNoItems).toBe(false);
	});

	it('should remove item', () => {
		const mockDataMinusOne = mockData.filter(d => d.id !== 1);
		cartService.remove.and.returnValue(of(mockDataMinusOne));
		component.remove(mockItem);
		expect(cartService.remove).toHaveBeenCalledWith(mockItem);
		expect(component.cart).toEqual(mockDataMinusOne);
	});

	it('should navigate when checkout is called', () => {
		settingsService.LoginGoNextUrl = '';
		component.review();
		expect(settingsService.LoginGoNextUrl).toBe(component.urlNext);
		expect(router.navigate).toHaveBeenCalledOnceWith([component.urlNext]);
	});

	it('should have subscriptions and unsubscribe', () => {
		cartService.getCart.and.returnValue(of([]));
		const addSpy = spyOn(component.subscriptions, 'add').and.callThrough();
		const unsubscribeSpy = spyOn(component.subscriptions, 'unsubscribe').and.callThrough();
		component.ngOnInit();
		expect(addSpy).toHaveBeenCalled();
		expect(addSpy.calls.count()).toBeGreaterThan(0);
		component.ngOnDestroy();
		expect(unsubscribeSpy).toHaveBeenCalled();
	});

	it('should show Check Out button if have items in cart', fakeAsync(() => {
		cartService.getCart.and.returnValue(of(mockData));
		fixture.detectChanges();
		tick();
		const buttons = document.querySelectorAll('button');
		let checkOutButton = null;
		buttons.forEach(button => {
			if (button.textContent && button.textContent.trim() === 'Check Out') {
				checkOutButton = button;
			}
		});
		expect(checkOutButton).not.toBeNull();
	}));

});
