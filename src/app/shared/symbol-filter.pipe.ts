import {Pipe, PipeTransform} from '@angular/core';
import {CurrencySymbol} from '../data/models/currencysymbol';

@Pipe({
  name: 'symbolFilter'
})
export class SymbolFilterPipe implements PipeTransform{
  transform(symbols: CurrencySymbol[], searchString: string): CurrencySymbol[] {
    if (!searchString.trim()) {
      return symbols;
    }
    return symbols.filter(symbol => {
      return symbol.value.indexOf(searchString.toUpperCase()) !== -1;
    });
  }
}
