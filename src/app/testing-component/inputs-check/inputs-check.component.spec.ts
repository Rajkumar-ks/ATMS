import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsCheckComponent } from './inputs-check.component';

describe('InputsCheckComponent', () => {
  let component: InputsCheckComponent;
  let fixture: ComponentFixture<InputsCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputsCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputsCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
