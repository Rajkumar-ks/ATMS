import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoletypeComponent } from './roletype.component';

describe('RoletypeComponent', () => {
  let component: RoletypeComponent;
  let fixture: ComponentFixture<RoletypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoletypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoletypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
