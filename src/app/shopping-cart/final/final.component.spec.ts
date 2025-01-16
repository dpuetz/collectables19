import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FinalComponent } from './final.component';
import { CartService } from '../../common/cart.service';
import { of } from 'rxjs';

describe('FinalComponent', () => {
	//declare component
	let component: FinalComponent;
	let fixture: ComponentFixture<FinalComponent>;

	//declare services
	let cartService: jasmine.SpyObj<CartService>;
	let router: jasmine.SpyObj<Router>;

	//set data
	const mockData = [{ id: 1, name: 'Blue Crackle Glass', description: 'Hat-shaped bowl and ruffle-edged bowl.', price: 20.00, category: 'bowls', catgegoryIcon: false, imageUrl: 'Blue Crackle Glass.jpg', },
	{ id: 2, name: 'Green Beehive Bowl', description: 'Green fired-on beehive-patterned bowl.', price: 25.00, category: 'bowls', catgegoryIcon: true, imageUrl: 'Green Beehive Bowl.jpg', },
	{ id: 3, name: 'Peacock Pattern Bowl', description: 'EAPG bowl with peacock feathers pattern.', price: 30.00, category: 'bowls', catgegoryIcon: false, imageUrl: 'Peacock Pattern Bowl.jpg', }];
	const mockCartTotal = 75;

	beforeEach(async () => {
		//create spies
		const cartServiceSpy = jasmine.createSpyObj('CartService', ['getCart', 'getCartTotal', 'checkout']);
		const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

		//create test bed
		TestBed.configureTestingModule({
			imports: [FinalComponent],
			providers: [
				{ provide: CartService, useValue: cartServiceSpy },
				{ provide: Router, useValue: routerSpy },
			],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();

		//create component
		fixture = TestBed.createComponent(FinalComponent);
		component = fixture.componentInstance;

		//inject services into testBed
		cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
		router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
	});

	afterEach(() => {
		component.ngOnDestroy();
	});

	it('should create FinalComponent', () => {
		expect(component).toBeTruthy();
	});

	// it('should have default values at start', () => {
	// 	expect(component.cart).toEqual([]);
	// 	expect(component.cartTotal).toBe(0);
	// 	expect(component.showNoItems).toBeFalse();
	// });

	// it('should set cart items on ngOnInit', () => {
	// 	cartService.getCart.and.returnValue(of(mockData));
	// 	component.ngOnInit();
	// 	expect(component.cart.length).toBe(mockData.length);
	// });

	// it('should call calculate total', () => {
	// 	cartService.getCart.and.returnValue(of(mockData));
	// 	cartService.getCartTotal.and.returnValue(mockCartTotal);
	// 	component.calculateTotal();
	// 	expect(component.cartTotal).toBe(mockCartTotal);
	// });

	// it('should showNoItems if there are none', () => {
	// 	cartService.getCart.and.returnValue(of([]));
	// 	component.ngOnInit();
	// 	expect(component.showNoItems).toBeTrue();
	// });

	// it('should call checkout in service when checkout in component called', () => {
	// 	component.checkout();
	// 	expect(cartService.checkout).toHaveBeenCalled();
	// 	expect(router.navigate).toHaveBeenCalledOnceWith(['/thankyou']);
	// });

	//   it('should unsubscribe on ngOnDestroy', () => {
	// 	spyOn(component.subscriptions, 'unsubscribe');
	// 	component.ngOnDestroy();
	// 	expect(component.subscriptions.unsubscribe).toHaveBeenCalled();
	//   });

	// it('should show checkout items in template', () => {
	// 	cartService.getCart.and.returnValue(of(mockData));
	// 	fixture.detectChanges();
	// 	const compiled = fixture.nativeElement;
	// 	expect(compiled.querySelectorAll('.checkoutImage').length).toBe(mockData.length);
	// });
	// it('should submit form when submit button is clicked',  () => {
	// 	cartService.getCart.and.returnValue(of(mockData));
	// 	fixture.detectChanges();
	// 	const compiled = fixture.nativeElement;
	// 	const submitButton = compiled.querySelector('button[type="submit"]');
	// 	submitButton.click();
	// 	expect(cartService.checkout).toHaveBeenCalled();
	// 	expect(router.navigate).toHaveBeenCalledWith(['/thankyou']);
	// });
});
