import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetweekStatusComponent } from './timesheetweek-status.component';

describe('TimesheetweekStatusComponent', () => {
  let component: TimesheetweekStatusComponent;
  let fixture: ComponentFixture<TimesheetweekStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetweekStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetweekStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
