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

import { MockDataModule } from './service/mock-data.module';

import { Dimensions } from './data/dimensions';
import { Losses } from './data/losses';

import { DimensionsService } from './service/dimensions.service';
import { LossesService } from './service/losses.service';
import { UserData } from './data/users';
import { UserService } from './service/users.service';
import { Fluids } from './data/fluids';
import { FluidsService } from './service/fluids.service';
import { PassagesService } from './service/passages.service';
import { Passages } from './data/passages';
import { HtcsService } from './service/htcs.service';
import { Htcs } from './data/htcs';
import { FacesService } from './service/faces.service';
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
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: 'http://127.0.0.1:8000',
        login: {
          endpoint: '/api/auth/jwt/create/',
          redirect: {
            success: '/pages/dimensions-and-losses',
            failure: null,
          },
        },
        register: {
          endpoint: '/api/auth/users/',
          requireValidToken: false,
          redirect: {
            success: '/auth/login',
            failure: null,
          },
        },
        logout: {
          endpoint: '/api/auth/jwt/blacklist/',
          method: 'post',
          redirect: {
            success: '/auth/login',
            failure: '/',
          },
        },
        token: {
          class: NbAuthJWTToken,
          key: 'token',
        },
        refreshToken: {
          endpoint: '/api/auth/jwt/refresh/',
          method: 'post',
          requireValidToken: true,
          redirect: {
            success: null,
            failure: null,
          },
        },
        errors: {
          getter: (module, res, options) => {
            if (module === 'login') {
              return res.error ? res.error.detail : options[module].defaultErrors;
            }
            if (module === 'register') {
              return res.error ? res.error.email[0] : options[module].defaultErrors;
            }
            return res.error ? res.error.message : options[module].defaultErrors;
          },
        },
      }),
    ],
    forms: {
      login: {
        socialLinks: [],
      },
      register: {
        socialLinks: [],
        terms: false
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
