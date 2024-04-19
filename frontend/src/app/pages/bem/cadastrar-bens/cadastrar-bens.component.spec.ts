import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarBensComponent } from './cadastrar-bens.component';

describe('CadastrarBensComponent', () => {
  let component: CadastrarBensComponent;
  let fixture: ComponentFixture<CadastrarBensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarBensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarBensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
