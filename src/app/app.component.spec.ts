import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from './login/user.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
	let userService: jasmine.SpyObj<UserService>;
	beforeEach(async () => {
		const userServiceSpy = jasmine.createSpyObj('userService', ['isLoggedIn']);
		await TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [
				{ provide: UserService, useValue: userServiceSpy },
				{ provide: ActivatedRoute, useValue: { queryParams: of({ filter: 'all' }) } },
			]
		}).compileComponents();
	});
	it('should test AppComponent', () => {
		expect(1).toBe(1);
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have the 'collectables' title`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('collectables');
	});
});
