import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementAgenceComponent } from './equipement-agence.component';

describe('EquipementAgenceComponent', () => {
  let component: EquipementAgenceComponent;
  let fixture: ComponentFixture<EquipementAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipementAgenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipementAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
