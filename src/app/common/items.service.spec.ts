import { TestBed } from "@angular/core/testing";
import { IItem } from "./IItem.model";
import { ItemsService } from "./items.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('ItemsService', () => {
	let service: ItemsService;
	let httpMock: HttpTestingController;
	let items: IItem[] = [];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [ItemsService],
		}).compileComponents();

		service = TestBed.inject(ItemsService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should test ItemsService', () => {
		expect(1).toBe(1);
	})

	it('should get all items', () => {
		const mockItems: IItem[] = [
			{ id: 1, name: 'Item 1', description: 'Description 1', price: 10, category: 'Category 1', catgegoryIcon: false, imageUrl: 'image1.jpg' },
			{ id: 2, name: 'Item 2', description: 'Description 2', price: 20, category: 'Category 2', catgegoryIcon: false, imageUrl: 'image2.jpg' },
			{ id: 3, name: 'Item 3', description: 'Description 3', price: 20, category: 'Category 2', catgegoryIcon: false, imageUrl: 'image3.jpg' }
		];
		service.getAllItems().subscribe(items => {
			expect(items.length).toBe(3); // Adjust the expected length based on mock data
			expect(items).toEqual(mockItems);
		});
		const req = httpMock.expectOne('api/items');
		expect(req.request.method).toBe('GET');
		req.flush(mockItems);  //if you don't call this, the service will not get the mockItems list
	});

	it('should get one item', () => {
		const mockItems: IItem =
			{ id: 1, name: 'Item 1', description: 'Description 1', price: 10, category: 'Category 1', catgegoryIcon: false, imageUrl: 'image1.jpg' };

		service.getItem(1).subscribe(item => {
			expect(item.id).toBe(1);
			expect(item.name).toBe('Item 1');
		});
		const req = httpMock.expectOne(`api/items/1`);
		expect(req.request.method).toBe('GET');
		req.flush(mockItems);
	});
});



