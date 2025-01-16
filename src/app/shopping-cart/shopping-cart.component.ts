import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './side-menu/side-menu.component';

@Component({
	standalone:true,
	selector: 'app-shopping-cart',
	imports: [RouterOutlet, SideMenuComponent],
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

}
