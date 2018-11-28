import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeComponent } from './dde.component';

describe('DdeComponent', () => {
  let component: DdeComponent;
  let fixture: ComponentFixture<DdeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
