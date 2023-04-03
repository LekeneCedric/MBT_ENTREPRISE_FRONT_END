import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieEquipementComponent } from './categorie-equipement.component';

describe('CategorieEquipementComponent', () => {
  let component: CategorieEquipementComponent;
  let fixture: ComponentFixture<CategorieEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieEquipementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
