import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveConfigurationHrComponent } from './leave-configuration-hr.component';

describe('LeaveConfigurationHrComponent', () => {
  let component: LeaveConfigurationHrComponent;
  let fixture: ComponentFixture<LeaveConfigurationHrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveConfigurationHrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveConfigurationHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
