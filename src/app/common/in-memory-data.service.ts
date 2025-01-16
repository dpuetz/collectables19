import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IItem } from './IItem.model';

export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		const items: IItem[] = [
			{
				id: 1,
				name: 'Blue Crackle Glass',
				description: 'Hat-shaped bowl and ruffle-edged bowl.',
				price: 20.00,
				category: 'bowls',
				catgegoryIcon: false,
				imageUrl: 'Blue Crackle Glass.jpg',
			},
			{
				id: 2,
				name: 'Green Beehive Bowl',
				description: 'Green fired-on beehive-patterned bowl.',
				price: 25.00,
				category: 'bowls',
				catgegoryIcon: true,
				imageUrl: 'Green Beehive Bowl.jpg',
			},
			{
				id: 3,
				name: 'Peacock Pattern Bowl',
				description: 'EAPG bowl with peacock feathers pattern.',
				price: 30.00,
				category: 'bowls',
				catgegoryIcon: false,
				imageUrl: 'Peacock Pattern Bowl.jpg',
			},

			{
				id: 4,
				name: 'Pink Doric Bowl',
				description: 'Pink depression glass oval bowl. Doric pattern.',
				price: 20.00,
				category: 'bowls',
				catgegoryIcon: false,
				imageUrl: 'Pink Doric Bowl.jpg',
			},
			{
				id: 5,
				name: 'Two-Panel Oval Bowl',
				description: 'Apple-green EAPG oval bowl.',
				price: 40.00,
				category: 'bowls',
				catgegoryIcon: false,
				imageUrl: 'Two-Panel Oval Bowl.jpg',
			},
			{
				id: 6,
				name: 'Delphite Coffee',
				description: 'Delphite blue coffee canister',
				price: 100.00,
				category: 'canisters',
				catgegoryIcon: true,
				imageUrl: 'Delphite Coffee.jpg',
			},
			{
				id: 7,
				name: 'Hazel Atlas Flour',
				description: 'Green fired-on Hazel Atlas Flour canister.',
				price: 120.00,
				category: 'canisters',
				catgegoryIcon: false,
				imageUrl: 'Hazel Atlas Flour.jpg',
			},
			{
				id: 8,
				name: 'Hazel Atlas Tea',
				description: 'Green fired-on Hazel Atlas Tea canister.',
				price: 115.00,
				category: 'canisters',
				catgegoryIcon: false,
				imageUrl: 'Hazel Atlas Tea.jpg',
			},
			{
				id: 9,
				name: 'Red Flour',
				description: 'Fired-on red flour Canister.',
				price: 80.00,
				category: 'canisters',
				catgegoryIcon: false,
				imageUrl: 'Red Flour.jpg',
			},
			{
				id: 10,
				name: 'Jadite Tea',
				description: 'Jadite Tea Canister',
				price: 130.00,
				category: 'canisters',
				catgegoryIcon: false,
				imageUrl: 'Jadite Tea.jpg',
			},
			{
				id: 11,
				name: 'Adam Shakers',
				description: 'Depression pink shakers. Adam pattern.',
				price: 30.00,
				category: 'shakers',
				catgegoryIcon: false,
				imageUrl: 'Adam Shakers.jpg',
			},
			{
				id: 12,
				name: 'Amber Sharon Shakers',
				description: 'Amber salt and pepper shakers. Sharon pattern.',
				price: 20.00,
				category: 'shakers',
				catgegoryIcon: false,
				imageUrl: 'Amber Sharon Shakers.jpg',
			},
			{
				id: 13,
				name: 'Blue Flour Shaker',
				description: 'McKee fired-on blue flour shaker.',
				price: 50.00,
				category: 'shakers',
				catgegoryIcon: false,
				imageUrl: 'Blue Flour Shaker.jpg',
			},
			{
				id: 14,
				name: 'Blue Pepper Shaker',
				description: 'McKee fired-on blue pepper shaker.',
				price: 55.00,
				category: 'shakers',
				catgegoryIcon: false,
				imageUrl: 'Blue Pepper Shaker.jpg',
			},
			{
				id: 15,
				name: 'Blue Sugar Shaker',
				description: 'Fired-on blue sugar shaker. Circa 1950.',
				price: 35.00,
				category: 'shakers',
				catgegoryIcon: true,
				imageUrl: 'Blue Sugar Shaker.jpg',
			},

		];
		return { items };
	}
}