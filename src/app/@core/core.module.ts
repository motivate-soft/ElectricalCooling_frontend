import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthJWTToken, NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
} from './utils';

import { MockDataModule } from './mock/mock-data.module';

import { Dimensions } from './data/dimensions';
import { Losses } from './data/losses';

import { DimensionsService } from './mock/dimensions.service';
import { LossesService } from './mock/losses.service';
import { UserData } from './data/users';
import { UserService } from './mock/users.service';
import { Fluids } from './data/fluids';
import { FluidsService } from './mock/fluids.service';
import { PassagesService } from './mock/passages.service';
import { Passages } from './data/passages';
import { HtcsService } from './mock/htcs.service';
import { Htcs } from './data/htcs';
import { FacesService } from './mock/faces.service';
import { Faces } from './data/faces';
import { AuthGuard } from './auth-guard.service';

const socialLinks = [
  {
    url: "https://github.com/akveo/nebular",
    target: "_blank",
    icon: "github",
  },
  {
    url: "https://www.facebook.com/akveo/",
    target: "_blank",
    icon: "facebook",
  },
  {
    url: "https://twitter.com/akveo_inc",
    target: "_blank",
    icon: "twitter",
  },
];

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
  { provide: Dimensions, useClass: DimensionsService },
  { provide: Losses, useClass: LossesService },
  { provide: Fluids, useClass: FluidsService },
  { provide: Passages, useClass: PassagesService },
  { provide: Htcs, useClass: HtcsService },
  { provide: Faces, useClass: FacesService },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({
    strategies: [
      NbDummyAuthStrategy.setup({
        name: 'email',
        delay: 3000,
      }),
      // NbPasswordAuthStrategy.setup({
      //   name: 'email',
      //   baseEndpoint: 'http://127.0.0.1:8000',
      //   login: {
      //     endpoint: '/auth/jwt/create/',
      //     method: 'post',
      //     redirect: {
      //       success: '/pages/',
      //       failure: null,
      //     },
      //   },
      //   register: {
      //     endpoint: '/auth/users/',
      //   },
      //   token: {
      //     class: NbAuthJWTToken,
      //     key: 'access',
      //   },

      // }),
    ],
    forms: {
      login: {
        // socialLinks: socialLinks,
      },
      register: {
        // socialLinks: socialLinks,
      },
    },

  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider,
    useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
  AuthGuard
];

@NgModule({
  imports: [CommonModule],
  exports: [NbAuthModule],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS],
    };
  }
}
