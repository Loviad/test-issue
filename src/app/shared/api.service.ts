import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {formatDate} from '@angular/common';

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(private http: HttpClient) {
  }
  @Output() needPaintGraph = new EventEmitter<{ leftCur: string, rightCur: string }>();
  private url = 'https://free.currconv.com/api/v7/';
  private key = 'apiKey=4ae40c9452b442e94d73'; // хотел спрятать через proxy.conf но не завелось( без бэка пока не придумал как ещё
  // 9d48ab97b31d76bc421a
  // 047f96192b09046bca84

  emmitPaintChart(left: string, right: string): void {
    this.needPaintGraph.next({leftCur: left, rightCur: right});
  }

  getApprovedCurrency(): Observable<any> {
    return this.http.get('https://free.currconv.com/api/v7/currencies?' + this.key);
  }

  getPairData(left: string, right: string): Observable<any> {
    const date = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    return this.http.get(this.url + 'convert?' + this.key + '&q=' + left + '_' + right + '&compact=ultra&date=' + date);
  }

  getHistroyPair(left: string, right: string, date: Date): Observable<any> {
    const reqDate = new Date(date);
    reqDate.setDate(reqDate.getDate() + 8);
    const startDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
    const endDate = formatDate(reqDate, 'yyyy-MM-dd', 'en-US');
    return this.http.get(this.url + 'convert?' + this.key + '&q=' + left + '_' + right + '&compact=ultra&date=' +
      startDate + '&endDate=' + endDate);
  }
}
