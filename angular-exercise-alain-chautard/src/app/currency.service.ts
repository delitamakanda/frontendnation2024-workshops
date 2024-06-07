import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { Currency } from './currency-switcher/currency';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';


export interface CurrencyInfo {
  currency: Currency;
  rate: number;
}

export type ExchangeRates = Record<Currency, number>;

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  
  private http = inject(HttpClient);
  private readonly currency = signal<Currency>('USD');
  private exchangeRates = toSignal(this.http.get<ExchangeRates>('https://lp-store-server.vercel.app/rates'), {
    initialValue: {
      USD: 1,
      GBP: 0.8,
      EUR: 1.15
    }
  });
  private currencyInfo = computed<CurrencyInfo>(() => {
    return {
      currency: this.currency(),
      rate: this.exchangeRates()[this.currency()]
    };
  })


  currentCurrency(): Signal<CurrencyInfo> {
    return this.currencyInfo;
  }

  switchCurrency(currency: Currency): void {
    this.currency.set(currency);
  }
}
