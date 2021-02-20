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
// Your Api-Key: 243e497027b5ec4e6cc94d62b0be2d03
// madah64159@dxecig.com
// madah64159@dxecig.com
// Your Password: 602ee0bd029df

// 4ae40c9452b442e94d73
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
