import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechskillsComponent } from './techskills.component';

describe('TechskillsComponent', () => {
  let component: TechskillsComponent;
  let fixture: ComponentFixture<TechskillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechskillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechskillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
