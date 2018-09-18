import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileDrawerComponent } from './mobile-drawer.component';

describe('MobileDrawerComponent', () => {
  let component: MobileDrawerComponent;
  let fixture: ComponentFixture<MobileDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
