import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetApprovalComponent } from './timesheet-approval.component';

describe('TimesheetApprovalComponent', () => {
  let component: TimesheetApprovalComponent;
  let fixture: ComponentFixture<TimesheetApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
