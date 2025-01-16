import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {
	private loginGoNextUrl: string = '';

	get LoginGoNextUrl(): string {
		return this.loginGoNextUrl;
	}

	set LoginGoNextUrl(value: string) {
		this.loginGoNextUrl = value;
	}

}
