import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RMDashboardComponent } from './rmdashboard.component';

describe('DashboardComponent', () => {
  let component: RMDashboardComponent;
  let fixture: ComponentFixture<RMDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RMDashboardComponent]
    });
    fixture = TestBed.createComponent(RMDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
