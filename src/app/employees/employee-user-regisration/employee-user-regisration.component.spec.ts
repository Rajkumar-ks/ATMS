import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUserRegisrationComponent } from './employee-user-regisration.component';

describe('EmployeeUserRegisrationComponent', () => {
  let component: EmployeeUserRegisrationComponent;
  let fixture: ComponentFixture<EmployeeUserRegisrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeUserRegisrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUserRegisrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
