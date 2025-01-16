import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IUserCredentials } from './user.model';
import { UserService } from './user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../common/setting.service';

@Component({
	standalone: true,
	selector: 'app-login',
	imports: [CommonModule, FormsModule],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
	credentials: IUserCredentials = { email: '', password: '' };
	showLogInError: boolean = false;
	showCartMessage: boolean = false;
	@ViewChild('logInForm') logInForm!: NgForm;
	nextUrl: string = '';
	catalogPath:string = '/catalog';
	cartPath:string='/cart/final';

	constructor(
		private userService: UserService,
		private router: Router,
		private settingsService: SettingsService,
	) {}
	
	ngOnInit() {		
		this.nextUrl = this.settingsService.LoginGoNextUrl ? this.settingsService.LoginGoNextUrl : this.catalogPath;
		if (this.nextUrl == this.cartPath) {
			this.showCartMessage = true;
		}
	}
	
	logIn() {
		this.showLogInError = false;
		if (this.userService.logIn(this.credentials)) {
			this.navigate();
		} else {
			this.showLogInError = true;
		}
	}

	logTest(isAdmin: boolean) {
		this.userService.loginAsTestUser(isAdmin);
		this.navigate();
	}

	navigate() {
		this.settingsService.LoginGoNextUrl = '';
		this.router.navigate([this.nextUrl]);
	}	
}
