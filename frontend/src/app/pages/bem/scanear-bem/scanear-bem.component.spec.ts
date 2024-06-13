import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanearBemComponent } from './scanear-bem.component';

describe('ScanearBemComponent', () => {
  let component: ScanearBemComponent;
  let fixture: ComponentFixture<ScanearBemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanearBemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanearBemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
