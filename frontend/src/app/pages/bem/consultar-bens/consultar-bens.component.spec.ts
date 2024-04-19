import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarBensComponent } from './consultar-bens.component';

describe('ConsultarBensComponent', () => {
  let component: ConsultarBensComponent;
  let fixture: ComponentFixture<ConsultarBensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarBensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarBensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
