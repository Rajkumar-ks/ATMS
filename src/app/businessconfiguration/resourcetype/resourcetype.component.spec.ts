import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcetypeComponent } from './resourcetype.component';

describe('ResourcetypeComponent', () => {
  let component: ResourcetypeComponent;
  let fixture: ComponentFixture<ResourcetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
