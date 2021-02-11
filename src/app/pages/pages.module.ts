import {NgModule} from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule,
  NbSelectModule,
  NbUserModule
} from '@nebular/theme';
import {FormsModule as ngFormsModule} from '@angular/forms';

import {ThemeModule} from '../@theme/theme.module';
import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {CmodelListComponent} from './cmodel-list/cmodel-list.component';
import {ProfileComponent} from './profile/profile.component';

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
    ngFormsModule,
  ],
  declarations: [PagesComponent, CmodelListComponent, ProfileComponent],
})
export class PagesModule {
}
