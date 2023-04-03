import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RappelsMaintenanceComponent } from './rappels-maintenance.component';

describe('RappelsMaintenanceComponent', () => {
  let component: RappelsMaintenanceComponent;
  let fixture: ComponentFixture<RappelsMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RappelsMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RappelsMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
