import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkEquipementToSalleComponent } from './link-equipement-to-salle.component';

describe('LinkEquipementToSalleComponent', () => {
  let component: LinkEquipementToSalleComponent;
  let fixture: ComponentFixture<LinkEquipementToSalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkEquipementToSalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkEquipementToSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
