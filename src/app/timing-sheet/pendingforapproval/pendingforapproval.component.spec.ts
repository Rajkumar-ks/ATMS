import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingforapprovalComponent } from './pendingforapproval.component';

describe('PendingforapprovalComponent', () => {
  let component: PendingforapprovalComponent;
  let fixture: ComponentFixture<PendingforapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingforapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingforapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
