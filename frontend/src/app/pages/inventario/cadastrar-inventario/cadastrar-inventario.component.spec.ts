import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarInventarioComponent } from './cadastrar-inventario.component';

describe('CadastrarInventarioComponent', () => {
  let component: CadastrarInventarioComponent;
  let fixture: ComponentFixture<CadastrarInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
