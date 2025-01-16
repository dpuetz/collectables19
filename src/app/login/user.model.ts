export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
	isAdmin: boolean;
}

export interface IUserCredentials {
	email: string;
	password: string;
}
