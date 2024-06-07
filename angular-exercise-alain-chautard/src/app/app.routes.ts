import { Routes } from '@angular/router';
import {StoreViewComponent} from './store-view/store-view.component';
import {CartViewComponent} from './cart-view/cart-view.component';
import {CheckoutViewComponent} from './checkout-view/checkout-view.component';

export const routes: Routes = [
  {path: "", component: StoreViewComponent},
  {path: "cart", component: CartViewComponent},
  {path: "checkout", component: CheckoutViewComponent}
];
