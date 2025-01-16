import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { IUser, IUserCredentials } from './user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private user: BehaviorSubject<IUser | null>;
	private users: IUser[] = [
		{ firstName: 'Joe', lastName: 'Admin', email: 'Joe@joes.com', password: 'passForJoe', isAdmin: true },
		{ firstName: 'Jane', lastName: 'User', email: 'Jane@janes.com', password: 'passForJane', isAdmin: false },
	];

	constructor(private http: HttpClient) {
		this.user = new BehaviorSubject<IUser | null>(null);
	}

	getUser(): Observable<IUser | null> {
		return this.user.asObservable();
	}

	isAdmin(): boolean {
		const user = this.user.getValue();
		return (user === null) ? false : user.isAdmin;
	}

	isLoggedIn(): boolean {
		const user = this.user.getValue();
		return (user !== null);
	}

	logIn(credentials: IUserCredentials): boolean {
		const user = this.users.find((user) => user.email === credentials.email && user.password === credentials.password);
		if (user) {
			this.user.next(user);
			return true;
		}
		else {
			this.user.next(null);
			return false;
		}
	}

	loginAsTestUser(isAdmin: boolean) {
		const user = this.users.find((user) => user.isAdmin === isAdmin);
		if (user)
			this.user.next(user)
	}

	logOut() {
		this.user.next(null);
	}
}

