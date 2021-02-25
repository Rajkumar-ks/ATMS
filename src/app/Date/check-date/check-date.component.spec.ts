import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDateComponent } from './check-date.component';

describe('CheckDateComponent', () => {
  let component: CheckDateComponent;
  let fixture: ComponentFixture<CheckDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
