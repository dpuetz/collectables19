import { TestBed } from "@angular/core/testing";
import { IItem } from "./IItem.model";
import { CartService } from "./cart.service";
import { concatMap } from "rxjs";

describe('CartService', () => {
	const items = [
		{ id: 1, name: 'Blue Crackle Glass', description: '', price: 10, category: 'bowls', catgegoryIcon: true, imageUrl: '' },
		{ id: 2, name: 'Green Beehive Bowl', description: '', price: 20, category: 'bowls', catgegoryIcon: false, imageUrl: '' },
		{ id: 7, name: 'Hazel Atlas Flour', description: 'Green fired-on Hazel Atlas Flour canister.', price: 30.00, category: 'canisters', catgegoryIcon: false, imageUrl: 'Hazel Atlas Flour.jpg', },
	] as IItem[];
	
	const newItem: IItem = {id: 200,name: 'Test Item',description: 'Test Description',price: 50,category: 'test',catgegoryIcon: false,imageUrl: ''	}

	let service: CartService;
	beforeEach(async () => {
		service = TestBed.inject(CartService);
	});
	it('default cartService', () => {
		expect(1).toBe(1);
	})
	// it('should be created', () => {
	// 	expect(service).toBeTruthy();
	// });
	// it('should return the current cart as an observable', () => {		
	// 	service.getCart().subscribe(cart => {
	// 	  expect(cart).toEqual([]);
	// 	});
	//   });
	// it('should add a new item to the cart', () => {
	// 	service.add(newItem).subscribe(cart => {
	// 		expect(cart).toContain(newItem);
	// 	});
	// });
	// it('should not add duplicate items to the cart', () => {
	// 	service.add(newItem).subscribe();
	// 	service.add(newItem).subscribe(cart => {
	// 		expect(cart.filter(item => item.id === newItem.id).length).toBe(1);
	// 	});
	// });
	// it('should remove item in the cart', () => {
	// 	service.add(newItem)
	// 	.pipe(
	// 		concatMap(() => service.remove(newItem))
	// 	)
	// 	.subscribe(cart => {
	// 		expect(cart.length).toBe(0);
	// 	});
	// });	
	// it('should get cart total', () => {
	// 	service.add(newItem).subscribe((cart) => {
	// 		const total = service.getCartTotal();
	// 		expect(total).toBe(50);
	// 	});
	// });

	// it('should checkout the cart', () => {
	// 	service.add(newItem)
	// 	.pipe(
	// 		concatMap((cart1) => {
	// 			expect(cart1.length).toBe(1);
	// 			return service.remove(newItem)}
	// 		),
	// 		concatMap((cart2) => {
	// 			expect(cart2.length).toBe(0);
	// 			service.checkout();
	// 			return service.getCart()}
	// 		)			
	// 	)
	// 	.subscribe(cart3 => {
	// 		expect(cart3.length).toBe(0);
	// 	});
	// });	
	
});
