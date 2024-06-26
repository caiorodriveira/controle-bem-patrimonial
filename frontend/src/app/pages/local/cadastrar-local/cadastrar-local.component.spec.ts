import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarLocalComponent } from './cadastrar-local.component';

describe('CadastrarLocalComponent', () => {
  let component: CadastrarLocalComponent;
  let fixture: ComponentFixture<CadastrarLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarLocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
