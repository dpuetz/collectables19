import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { UserService } from './user.service';
import { IUser, IUserCredentials } from './user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

describe('UserService', () => {
	let service: UserService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [UserService, provideHttpClientTesting(), provideHttpClient()]
		});

		service = TestBed.inject(UserService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should test UserService', () => {
		expect(1).toBe(1);
	})

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('GetUser', () => {
		it('should return null if no user', () => {
			service.getUser().subscribe(user => {
				expect(user).toBe(null);
			});
		});
		it('should return user if has user', () => {
			const mockUser: IUser = { firstName: 'Joe', lastName: 'Admin', email: 'Joe@joes.com', password: 'passForJoe', isAdmin: true };
			service['user'] = new BehaviorSubject<IUser | null>(mockUser);
			service.getUser().subscribe(user => {
				expect(user).toEqual(mockUser);
				expect(user?.firstName).toEqual(mockUser.firstName);
			});
		});
	});
	describe('Return isAdmin', () => {
		it('should return isAdmin true correctly', () => {
			const mockUser: IUser = { firstName: 'Joe', lastName: 'Admin', email: 'Joe@joes.com', password: 'passForJoe', isAdmin: true };
			service['user'] = new BehaviorSubject<IUser | null>(mockUser);
			let result = service.isAdmin();
			expect(result).toBe(true);
		})
	})
	describe('login', () => {
		it('should log in a user', () => {
			const credentials: IUserCredentials = { email: 'Joe@joes.com', password: 'passForJoe' };
			const canLogIn = service.logIn(credentials);
			expect(canLogIn).toBe(true);
			const isLoggedIn = service.isLoggedIn();
			expect(isLoggedIn).toBe(true);
		})
	});
	describe('logOut', () => {
		it('should log out the current user', () => {
			const mockUser: IUser = { firstName: 'Joe', lastName: 'Admin', email: 'Joe@joes.com', password: 'passForJoe', isAdmin: true };
			service['user'].next(mockUser); //user is private to the UserService and CoPilot said this is not recommended, although it works.

			service.logOut();

			expect(service['user'].getValue()).toBeNull();
		});
	});
});
