import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarManutencaoComponent } from './consultar-manutencao.component';

describe('ConsultarManutencaoComponent', () => {
  let component: ConsultarManutencaoComponent;
  let fixture: ComponentFixture<ConsultarManutencaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarManutencaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
