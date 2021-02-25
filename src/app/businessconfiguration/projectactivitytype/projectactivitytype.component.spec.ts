import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectactivitytypeComponent } from './projectactivitytype.component';

describe('ProjectactivitytypeComponent', () => {
  let component: ProjectactivitytypeComponent;
  let fixture: ComponentFixture<ProjectactivitytypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectactivitytypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectactivitytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
