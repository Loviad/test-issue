import {AfterViewInit, Component, ElementRef, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-coin-anim',
  templateUrl: './coin-anim.component.svg',
  styleUrls: ['./coin-anim.component.scss']
})
export class CoinAnimComponent implements AfterViewInit{

  constructor(@Inject(DOCUMENT) private document: Document, private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    const anim = this.document.createElement('script');
    anim.type = 'text/javascript';
    anim.src = '../../../assets/index.js';
    const s = this.document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../../../assets/lottie.js';
    this.elementRef.nativeElement.appendChild(s);
    this.elementRef.nativeElement.appendChild(anim);
  }
}
