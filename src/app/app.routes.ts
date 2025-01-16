import { Router, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { LoginComponent } from './login/login.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ThankYouComponent } from './shopping-cart/thank-you/thank-you.component';
import { PriceChangeComponent } from './price-change/price-change.component';
import { inject } from '@angular/core';
import { UserService } from './login/user.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
export const routes: Routes = [

	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'catalog', component: CatalogComponent },
	{ path: 'detail/:id', component: ItemDetailComponent },
	{ path: 'cart', component: ShoppingCartComponent },
	{
		path: 'cart',
		loadChildren: () => import('./shopping-cart/cart-routes').then(m => m.cartRoutes)
	},
	{
		path: 'thankyou',
		component: ThankYouComponent
	},
	{ path: 'login', component: LoginComponent },
	{
		path: 'price', component: PriceChangeComponent,
		canActivate: [
			() => {
				const userService = inject(UserService);
				const router = inject(Router)
				if (userService.isAdmin()) {
					return true;
				} else {
					router.navigate(['/not-auth']);
					return false;
				}
			}
		]
	},
	{
		path: 'not-auth',
		component: NotAuthorizedComponent,
	},
	{
		path: '**',
		component: NotFoundComponent,
	},
];
