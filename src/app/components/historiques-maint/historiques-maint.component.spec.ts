import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquesMaintComponent } from './historiques-maint.component';

describe('HistoriquesMaintComponent', () => {
  let component: HistoriquesMaintComponent;
  let fixture: ComponentFixture<HistoriquesMaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriquesMaintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriquesMaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
