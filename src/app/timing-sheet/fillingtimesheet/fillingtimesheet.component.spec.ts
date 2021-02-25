import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillingtimesheetComponent } from './fillingtimesheet.component';

describe('FillingtimesheetComponent', () => {
  let component: FillingtimesheetComponent;
  let fixture: ComponentFixture<FillingtimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillingtimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillingtimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
