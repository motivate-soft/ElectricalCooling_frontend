import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule,
  NbPopoverModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThemeModule } from '../@theme/theme.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { CmodelListComponent } from './cmodel-list/cmodel-list.component';
import { ProfileComponent } from './profile/profile.component';
import { DetailModule } from './cmodel-detail/detail.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbInputModule,
    NbCheckboxModule,
    NbCardModule,
    NbSelectModule,
    NbIconModule,
    NbPopoverModule,
    ngFormsModule,
    ReactiveFormsModule,

    DetailModule,
  ],
  declarations: [PagesComponent, CmodelListComponent, ProfileComponent],
})
export class PagesModule {
}
