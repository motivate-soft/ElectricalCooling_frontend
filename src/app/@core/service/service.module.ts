import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HtcsService } from './htcs.service';
import { CoolingModelService } from './cooling-model.service';
import { UserService } from './users.service';
import { ApiService } from './api.service';
import { NgxToastrService } from './toast.service';

const SERVICES = [
  ApiService,
  HtcsService,
  UserService,
  CoolingModelService,
  NgxToastrService,
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
