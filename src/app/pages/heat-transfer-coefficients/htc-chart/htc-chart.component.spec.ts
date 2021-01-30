import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtcChartComponent } from './htc-chart.component';

describe('HtcChartComponent', () => {
  let component: HtcChartComponent;
  let fixture: ComponentFixture<HtcChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtcChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtcChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
