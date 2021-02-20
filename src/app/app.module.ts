import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {CoinAnimComponent} from './icons/coin-anim/coin-anim.component';
import {CurrencyComponent} from './currency/currency.component';
import { HelloComponent } from './hello/hello.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {SymbolFilterPipe} from './shared/symbol-filter.pipe';
import { ChartComponent } from './chart/chart.component';

const appRoutes: Routes = [
  {path: 'currency', component: CurrencyComponent},
  {path: 'hello', component: HelloComponent},
  {path: '', redirectTo: '/hello', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    CoinAnimComponent,
    CurrencyComponent,
    HelloComponent,
    SymbolFilterPipe,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
