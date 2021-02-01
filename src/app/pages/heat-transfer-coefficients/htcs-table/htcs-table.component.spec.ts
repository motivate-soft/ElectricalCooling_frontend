import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtcsTableComponent } from './htcs-table.component';

describe('HtcsTableComponent', () => {
  let component: HtcsTableComponent;
  let fixture: ComponentFixture<HtcsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtcsTableComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtcsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
