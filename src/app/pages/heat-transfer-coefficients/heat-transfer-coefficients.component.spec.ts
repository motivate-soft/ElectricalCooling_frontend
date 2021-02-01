import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatTransferCoefficientsComponent } from './heat-transfer-coefficients.component';

describe('HeatTransferCoefficientsComponent', () => {
  let component: HeatTransferCoefficientsComponent;
  let fixture: ComponentFixture<HeatTransferCoefficientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeatTransferCoefficientsComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatTransferCoefficientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
