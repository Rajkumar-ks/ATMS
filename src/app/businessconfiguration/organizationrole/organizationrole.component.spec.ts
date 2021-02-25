import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationroleComponent } from './organizationrole.component';

describe('OrganizationroleComponent', () => {
  let component: OrganizationroleComponent;
  let fixture: ComponentFixture<OrganizationroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
