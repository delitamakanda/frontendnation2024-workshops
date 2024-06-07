import {Component, computed, inject} from '@angular/core';
import {Currency} from './currency';
import {CurrencyService} from '../currency.service';

@Component({
  selector: 'app-currency-switcher',
  standalone: true,
  templateUrl: './currency-switcher.component.html',
  styleUrls: ['./currency-switcher.component.css']
})
export class CurrencySwitcherComponent {

  showItems = false;
  service = inject(CurrencyService);
  currency = this.service.currentCurrency();

  changeCurrency(currency: Currency): void {
    this.service.switchCurrency(currency);
    this.showItems = false;
  }
}
