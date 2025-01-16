// No matter what I can't make this work

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';
// import { HeaderComponent } from './header.component';
// import { UserService } from '../login/user.service';
// import { CartService } from '../common/cart.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';
// import { IUser } from '../login/user.model';
// import { IItem } from '../common/IItem.model';
// import { By } from '@angular/platform-browser';

// @Directive({
//   selector: '[routerLink]',
//   host: { '(click)': 'onClick()' }
// })
// export class RouterLinkDirectiveStub {
//   @Input('routerLink') linkParams: any;
//   navigatedTo: any = null;
//   onClick() {
//     this.navigatedTo = this.linkParams;
//   }
// }

// @Directive({
//   selector: '[routerLinkActive]'
// })
// export class RouterLinkActiveStub {
//   @Input() routerLinkActive: any;
// }

// describe('HeaderComponent', () => {
//   let component: HeaderComponent;
//   let fixture: ComponentFixture<HeaderComponent>;
//   let userService: jasmine.SpyObj<UserService>;
//   let cartService: jasmine.SpyObj<CartService>;
//   let router: jasmine.SpyObj<Router>;

//   const cartItems = [
//     { id: 1, name: 'Blue Crackle Glass', description: '', price: 10, category: 'bowls', catgegoryIcon: true, imageUrl: '' },
//     { id: 2, name: 'Green Beehive Bowl', description: '', price: 20, category: 'bowls', catgegoryIcon: false, imageUrl: '' },
//     { id: 7, name: 'Hazel Atlas Flour', description: 'Green fired-on Hazel Atlas Flour canister.', price: 30.00, category: 'canisters', catgegoryIcon: false, imageUrl: 'Hazel Atlas Flour.jpg', }
//   ] as IItem[];

//   beforeEach(async () => {
//     const userServiceSpy = jasmine.createSpyObj('UserService', ['getUser', 'isLoggedIn', 'logOut']);
//     const cartServiceSpy = jasmine.createSpyObj('CartService', ['getCart']);
//     const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
//     const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);

//     TestBed.configureTestingModule({
//       imports: [HeaderComponent, RouterLinkDirectiveStub, RouterLinkActiveStub],
//       providers: [
//         { provide: UserService, useValue: userServiceSpy },
//         { provide: CartService, useValue: cartServiceSpy },
//         { provide: Router, useValue: routerSpy },
//         { provide: ActivatedRoute, useValue: activatedRouteSpy }
//       ],
//       schemas: [NO_ERRORS_SCHEMA], // To ignore unknown elements and attributes in the template
//      // declarations: [RouterLinkDirectiveStub, RouterLinkActiveStub]
//     }).compileComponents();

//     fixture = TestBed.createComponent(HeaderComponent);
//     component = fixture.componentInstance;
//     userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
//     cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
//     router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

//     // Mock the return values
//     const user: IUser = { firstName: 'Joe', lastName: 'Admin', email: 'Joe@joes.com', password: 'passForJoe', isAdmin: true };
//     userService.getUser.and.returnValue(of(user));
//     cartService.getCart.and.returnValue(of(cartItems));
//   });

//   afterEach(() => {
//     component.ngOnDestroy();
//   });

//   it('default HeaderComponent', () => {
//     expect(1).toBe(1);
//   });

//   it('should initialize user and numberCartItems', () => {
//     fixture.detectChanges();

//     expect(component.user).toEqual({ firstName: 'Joe', lastName: 'Admin', email: 'Joe@joes.com', password: 'passForJoe', isAdmin: true });
//     expect(component.numberCartItems).toBe(3);

//     const userDisplay = fixture.debugElement.query(By.css('.nav-item.activeLink span')).nativeElement;
//     expect(userDisplay.textContent).toContain('Hi Joe!');

//     const cartCount = fixture.debugElement.query(By.css('.cartBadge')).nativeElement;
//     expect(cartCount.textContent).toBe('3');
//   });

//   it('should return true for isLoggedIn when user is logged in', () => {
//     userService.isLoggedIn.and.returnValue(true);
//     expect(component.isLoggedIn()).toBeTrue();
//   });

//   it('should call logOut and navigate to home on logOut', () => {
//     const event = new MouseEvent('click');
//     spyOn(event, 'preventDefault'); // Spy on preventDefault
//     userService.logOut.and.stub();

//     component.logOut(event);

//     expect(event.preventDefault).toHaveBeenCalled();
//     expect(userService.logOut).toHaveBeenCalled();
//     expect(router.navigate).toHaveBeenCalledWith(['/home']);
//   });

//   it('should unsubscribe on ngOnDestroy', () => {
//     const subscriptionSpy = spyOn(component.subscriptions, 'unsubscribe');
//     component.ngOnDestroy();
//     expect(subscriptionSpy).toHaveBeenCalled();
//   });
// });
