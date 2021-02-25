import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrUserRegistrationComponent } from './hr-user-registration.component';

describe('HrUserRegistrationComponent', () => {
  let component: HrUserRegistrationComponent;
  let fixture: ComponentFixture<HrUserRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrUserRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrUserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
