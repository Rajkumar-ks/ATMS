import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationconfigurationComponent } from './organizationconfiguration.component';

describe('OrganizationconfigurationComponent', () => {
  let component: OrganizationconfigurationComponent;
  let fixture: ComponentFixture<OrganizationconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
