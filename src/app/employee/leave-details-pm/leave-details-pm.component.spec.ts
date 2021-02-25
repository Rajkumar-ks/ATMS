import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDetailsPmComponent } from './leave-details-pm.component';

describe('LeaveDetailsPmComponent', () => {
  let component: LeaveDetailsPmComponent;
  let fixture: ComponentFixture<LeaveDetailsPmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveDetailsPmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveDetailsPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
