import { TestBed } from "@angular/core/testing";
import { SettingsService } from "./setting.service";

describe('SettingsService', () => {
	let service: SettingsService;
	beforeEach(async () => {
		service = TestBed.inject(SettingsService);
	});

	it('default SettingsService', () => {
		expect(1).toBe(1);
	})

	// it('should set and get LoginGoNextUrl', () => {
	// 	service.LoginGoNextUrl = '/catalog';
	// 	const url = service.LoginGoNextUrl;
	// 	expect(url).toBe('/catalog');
	// });

});

