import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExamenPracticoComponent } from './home-examen-practico.component';

describe('HomeExamenPracticoComponent', () => {
  let component: HomeExamenPracticoComponent;
  let fixture: ComponentFixture<HomeExamenPracticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeExamenPracticoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeExamenPracticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
