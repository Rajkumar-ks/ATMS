import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDetailsHrComponent } from './leave-details-hr.component';

describe('LeaveDetailsHrComponent', () => {
  let component: LeaveDetailsHrComponent;
  let fixture: ComponentFixture<LeaveDetailsHrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveDetailsHrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveDetailsHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
