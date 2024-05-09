import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBemComponent } from './editar-bem.component';

describe('EditarBemComponent', () => {
  let component: EditarBemComponent;
  let fixture: ComponentFixture<EditarBemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarBemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarBemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
