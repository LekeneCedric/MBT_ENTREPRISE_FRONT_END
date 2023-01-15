import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubequipementsComponent } from './subequipements.component';

describe('SubequipementsComponent', () => {
  let component: SubequipementsComponent;
  let fixture: ComponentFixture<SubequipementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubequipementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubequipementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
