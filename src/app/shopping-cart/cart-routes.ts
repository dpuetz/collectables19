import { Router, Routes } from "@angular/router";
import { ShoppingCartComponent } from "./shopping-cart.component";
import { FinalComponent } from "./final/final.component";
import { ReviewComponent } from "./review/review.component";
import { inject } from "@angular/core";
import { UserService } from "../login/user.service";

export const cartRoutes: Routes = [
	{
		path: '',
		component: ShoppingCartComponent,
		children: [
			{
				path: 'review',
				component: ReviewComponent
			},
			{
				path: 'final',
				component: FinalComponent,
				canActivate: [() => {
					const userService = inject(UserService);
					const router = inject(Router);
					if (!userService.isLoggedIn()) {
						router.navigate(['/login']);
						return false;
					}
					return true;
				}],
			},

		],
	}
];