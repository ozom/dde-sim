import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { details } from './details.component';

describe('DdeComponent', () => {
  let component: details;
  let fixture: ComponentFixture<details>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ details ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(details);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
