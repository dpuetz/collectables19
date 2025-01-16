import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { IItem } from '../common/IItem.model';

@Injectable({
	providedIn: 'root',
})
export class ItemsService {
	constructor(private http: HttpClient) { }

	getAllItems(): Observable<IItem[]> {
		return this.http.get<IItem[]>('api/items');
	}

	getItem(id: number): Observable<IItem> {
		return this.http.get<IItem>(`api/items/${id}`);
	}

	saveItem(item: IItem): Observable<IItem> {
		const headers = { headers: { 'Content-Type': 'application/json' } };
		return this.http.put<IItem>('api/items/', item, headers).pipe(delay(200));
	}
}
