import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarLocalComponent } from './consultar-local.component';

describe('ConsultarLocalComponent', () => {
  let component: ConsultarLocalComponent;
  let fixture: ComponentFixture<ConsultarLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarLocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
