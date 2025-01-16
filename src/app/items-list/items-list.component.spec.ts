import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IItem } from '../common/IItem.model';
import { ItemsListComponent } from './items-list.component';

describe('ItemListComponent', () => {
	//declare component 
	let component: ItemsListComponent;
	let fixture: ComponentFixture<ItemsListComponent>;

	//declare services
	let router: jasmine.SpyObj<Router>;

	//set data
	const mockItem: IItem = {id: 1,name: 'Item 1',description: 'Description 1',price: 10,category: 'Category 1',catgegoryIcon: true,imageUrl: 'image1.jpg'};
	const mockItems = [
		{ id: 1, name: 'Blue Crackle Glass', description: '', price: 10, category: 'bowls', catgegoryIcon: true, imageUrl: '' },
		{ id: 2, name: 'Green Beehive Bowl', description: '', price: 15, category: 'bowls', catgegoryIcon: false, imageUrl: '' },
		{ id: 7, name: 'Hazel Atlas Flour', description: 'Green fired-on Hazel Atlas Flour canister.', price: 120.00, category: 'canisters', catgegoryIcon: false, imageUrl: 'Hazel Atlas Flour.jpg', },
	] as IItem[];

	beforeEach(async () => {
		const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

		//create test bed
		TestBed.configureTestingModule({
			imports: [ItemsListComponent],
			providers: [
				{ provide: Router, useValue: routerSpy },
			],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();

		//create component
		fixture = TestBed.createComponent(ItemsListComponent);
		component = fixture.componentInstance;

		router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	// it('should initialize with default values', () => {
	// 	expect(component.items).toEqual([]);
	// 	expect(component.removable).toBe(false);
	// });

	// it('should navigate when item clicked', () => {
		
	// 	component.imageClicked(mockItem);

	// 	const routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
	// 	expect(routerSpy.navigate).toHaveBeenCalledWith(['/detail', mockItem.id])
	// });

	// it('should not navigate when item clicked and removable is false', () => {
	// 	component.removable = true;
	// 	component.imageClicked(mockItem);

	// 	const routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
	// 	expect(routerSpy.navigate).not.toHaveBeenCalledWith(['/detail', mockItem.id])
	// });	

	// it('should emit remove item', () => {
	// 	spyOn(component.removeItem, 'emit');	
	// 	component.remove(mockItem);
	// 	expect(component.removeItem.emit).toHaveBeenCalledWith( mockItem);
	// });	

	// it('should display item images in the template', () => {
	// 	// mockItems
	// 	component.items = mockItems;
	// 	fixture.detectChanges();
	// 	const compiled = fixture.nativeElement;
	// 	expect(compiled.querySelectorAll('.itemDiv').length).toBe(mockItems.length);
	//   });	

	//   it('should display item.name in the template', () => {
	// 	component.items = [mockItem];
	// 	fixture.detectChanges();
	// 	const compiled = fixture.nativeElement;
	// 	const itemdivs = compiled.querySelectorAll('.itemDiv');
	// 	let found = false;
	// 	itemdivs.forEach((d:any) => {
	// 		if (d && d.textContent && d.textContent.includes(mockItem.name)){
	// 			found = true;
	// 		}
	// 	});
	// 	expect(found).toBe(true);
	//   });	  

});
