import {Component, Input, inject, input} from '@angular/core';
import {LicensePlate} from '../license-plate';
import { CurrencyInfo, CurrencyService } from '../currency.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-license-plate',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './license-plate.component.html',
  styleUrls: ['./license-plate.component.css']
})
export class LicensePlateComponent {

  plate = input.required<LicensePlate>();

  buttonText = input<string>();

  protected currencyInfo = inject(CurrencyService).currentCurrency();

}
