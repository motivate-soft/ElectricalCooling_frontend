import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LossesService } from './losses.service';
import { DimensionsService } from './dimensions.service';
import { FluidsService } from './fluids.service';
import { PassagesService } from './passages.service';
import { HtcsService } from './htcs.service';
import { FacesService } from './faces.service';

const SERVICES = [
  DimensionsService,
  LossesService,
  FluidsService,
  PassagesService,
  HtcsService,
  FacesService
];

@NgModule({
  imports: [CommonModule],
  providers: [...SERVICES],
})
export class MockDataModule {
  static forRoot(): ModuleWithProviders<MockDataModule> {
    return {
      ngModule: MockDataModule,
      providers: [...SERVICES],
    };
  }
}
