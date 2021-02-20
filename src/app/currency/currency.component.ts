import {Component} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {CurrencySymbol} from '../data/models/currencysymbol';
import {PairCurrency} from '../data/models/paircurrency';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {

  constructor(private currencyService: ApiService) {
  }

  showSymbols = false;
  searchString = '';
  rates: CurrencySymbol[] = [];
  pairCurrency: PairCurrency[] = [];
  numbers = new Array<number>();
  selectedRate = '';

  showchart = false;

  private activePair = -1;

  onChartReady(): void {
    this.currencyService.emmitPaintChart(this.pairCurrency[this.activePair].left, this.pairCurrency[this.activePair].right);
  }

  clickItem(index: number): void {
    this.deactivatePair();
    if (this.pairCurrency[index].right === '') {
      this.showchart = false;
      this.selectedRate = '';
      this.showSymbols = true;
      this.pairCurrency[index].active = true;
      this.activePair = index;
    } else {
      this.showSymbols = false;
      this.pairCurrency[index].active = true;
      this.selectedRate = '';
      this.activePair = index;
      this.currencyService.emmitPaintChart(this.pairCurrency[this.activePair].left, this.pairCurrency[this.activePair].right);
    }
  }

  clickPair(name: string): void {
    if (this.activePair > -1 && this.pairCurrency[this.activePair].left !== name) {
      this.showchart = false;
      this.pairCurrency[this.activePair].right = name;
      this.showSymbols = false;
      this.selectedRate = '';
      this.showchart = true;
    } else {
      this.showchart = false;
      this.deactivatePair();
      this.selectedRate = name;
      if (this.pairCurrency.length > 14) {
        this.pairCurrency.shift();
        if (this.activePair > 0) {
          this.activePair--;
        }
      }
      this.pairCurrency.push(new PairCurrency(name, '', true, false));
      this.activePair = this.pairCurrency.length - 1;
    }
  }

  addCurrency(): void {
    if (!this.rates.length) {
      this.currencyService.getApprovedCurrency().subscribe((req) => {
        for (let i in req.results) {
          this.rates.push(new CurrencySymbol(req.results[i].id, req.results[i].currencyName));
        }
        this.showSymbols = true;
      });
    } else {
      this.showSymbols = true;
    }
    if (this.activePair > -1) {
      this.pairCurrency[this.activePair].active = false;
      this.activePair = -1;
    }
  }

  private deactivatePair(): void {
    if (this.activePair > -1 && this.pairCurrency.length > 0) {
      this.pairCurrency[this.activePair].active = false;
    }
  }
}
