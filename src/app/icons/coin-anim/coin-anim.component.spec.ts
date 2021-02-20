import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinAnimComponent } from './coin-anim.component';

describe('CoinAnimComponent', () => {
  let component: CoinAnimComponent;
  let fixture: ComponentFixture<CoinAnimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinAnimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinAnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
