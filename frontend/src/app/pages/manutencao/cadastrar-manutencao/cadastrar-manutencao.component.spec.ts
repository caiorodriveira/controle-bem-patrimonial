import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarManutencaoComponent } from './cadastrar-manutencao.component';

describe('CadastrarManutencaoComponent', () => {
  let component: CadastrarManutencaoComponent;
  let fixture: ComponentFixture<CadastrarManutencaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarManutencaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
