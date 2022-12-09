import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomthemeComponent } from './customtheme.component';

describe('CustomthemeComponent', () => {
  let component: CustomthemeComponent;
  let fixture: ComponentFixture<CustomthemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomthemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomthemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
