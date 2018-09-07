import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetDrawerComponent } from './internet-drawer.component';

describe('InternetDrawerComponent', () => {
  let component: InternetDrawerComponent;
  let fixture: ComponentFixture<InternetDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternetDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


//select sum(`profile`), payment_date from subscriber_detail where is_paid=1 group by payment_date having payment_date between (NOW() - INTERVAL 1 MONTH) and NOW()
