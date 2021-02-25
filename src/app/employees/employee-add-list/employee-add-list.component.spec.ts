import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddListComponent } from './employee-add-list.component';

describe('EmployeeAddListComponent', () => {
  let component: EmployeeAddListComponent;
  let fixture: ComponentFixture<EmployeeAddListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
