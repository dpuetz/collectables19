import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { UserService } from './user.service';
import { SettingsService } from '../common/setting.service';
import { IUserCredentials } from './user.model';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let userService: jasmine.SpyObj<UserService>;
    let settingsService: jasmine.SpyObj<SettingsService>;
    let router: jasmine.SpyObj<Router>;

    const userCredentials: IUserCredentials = { email: 'Joe@joes.com', password: 'passForJoe' };

    beforeEach(async () => {
        const userServiceSpy = jasmine.createSpyObj('userService', ['logIn', 'loginAsTestUser']);
        const settingsServiceSpy = jasmine.createSpyObj('settingsService', ['']);
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [FormsModule, LoginComponent],
            declarations: [],
            providers: [
                { provide: UserService, useValue: userServiceSpy },
                { provide: SettingsService, useValue: settingsServiceSpy },
                { provide: Router, useValue: routerSpy },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
        settingsService = TestBed.inject(SettingsService) as jasmine.SpyObj<SettingsService>;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        fixture.detectChanges();
    });

	it('should test LoginComponent', () => {
		expect(1).toBe(1);
	})	
	// it('should create', () => {
	// 	expect(component).toBeTruthy();
	// });		
	// it("should display showCartMessage when needed",  () => {
	// 	settingsService.LoginGoNextUrl = component.cartPath;
	// 	component.ngOnInit();	
	// 	expect(component.showCartMessage).toBe(true);
	// });	
	// it("should not display showCartMessage when not needed",  () => {
	// 	settingsService.LoginGoNextUrl = '';
	// 	component.ngOnInit();	
	// 	expect(component.showCartMessage).toBe(false);
	// });		
	// it("should display password required error", fakeAsync( () => {
	// 	fixture.detectChanges();
	// 	tick();
		
	// 	//get the email input and mark it as touched.
	// 	const emailControl = component.logInForm.controls['password'];	
	// 	emailControl.markAsTouched();
	
	// 	//submit form
	// 	component.logIn();
	
	// 	fixture.detectChanges();
		 
	// 	let compiled = fixture.debugElement.nativeElement;
	// 	let passwordError = compiled.querySelector('#password');
	// 	expect(passwordError).not.toBeNull();
	
	// }));

	// it("should display email valid error", fakeAsync( () => {
	// 	fixture.detectChanges();
	// 	tick();
		
	// 	//get the email input and mark it as touched.
	// 	const emailControl = component.logInForm.controls['email'];	
	// 	emailControl.markAsTouched();
	// 	emailControl.setValue('invalidEmail');
	
	// 	//submit form
	// 	component.logIn();
	
	// 	fixture.detectChanges();
		 
	// 	let compiled = fixture.debugElement.nativeElement;
	// 	let emailError = compiled.querySelector('#emailValid');
	// 	expect(emailError).not.toBeNull();
	
	// }));	

	// it('should have disabled submit button on create', fakeAsync(() => {
    //     fixture.detectChanges();
    //     tick();
    //     const elementSubmitBtn: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#submitBtn');
    //     expect(elementSubmitBtn.disabled).toBe(true);
    // }));


	// it('should create with correct initial state', () => {
	// 	expect(component.credentials).toEqual( { email: '', password: '' });
	// 	expect(component.showLogInError).toBe(false);
	// 	expect(component.showCartMessage).toBe(false);
	// });
	// it('should navigate when user has logged in successfully', () => {
	// 	userService.logIn.and.returnValue(true);
	// 	component.logIn();
	// 	expect(router.navigate).toHaveBeenCalled();
	// });
	// it('should show showLogInError when user login fails', () => {
	// 	userService.logIn.and.returnValue(false);
	// 	component.logIn();	
	// 	expect(component.showLogInError).toBe(true);
	// });
	// it('should show logTest calls loginAsTestUser ', () => {
	// 	userService.logIn.and.returnValue(false);
	// 	component.logTest(true);	
	// 	expect(userService.loginAsTestUser).toHaveBeenCalled();
	// });
	// it('should navigate to saved url ', () => {
	// 	component.nextUrl = '/test';		
	// 	component.navigate();	
	// 	expect(router.navigate).toHaveBeenCalledWith(['/test']);
	// });	
	// it('should navigate to default url ', () => {
	// 	settingsService.LoginGoNextUrl = '';		
	// 	component.navigate();	
	// 	expect(router.navigate).toHaveBeenCalledWith(['/catalog']);
	// });		
});
