import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddListDetailsComponent } from './employee-add-list-details.component';

describe('EmployeeAddListDetailsComponent', () => {
  let component: EmployeeAddListDetailsComponent;
  let fixture: ComponentFixture<EmployeeAddListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
