import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthJWTToken, NbAuthOAuth2Token, NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy } from '@nebular/auth';
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

import { MockDataModule } from './service/service.module';

import { UserData } from './data/users';
import { UserService } from './service/users.service';
import { Htcs } from './data/htcs';
import { HtcsService } from './service/htcs.service';
import { AuthGuard } from './auth-guard.service';
import { CoolingModelData } from './data/cooling-model';
import { CoolingModelService } from './service/cooling-model.service';
import { ApiData } from './data/api';
import { ApiService } from './service/api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxAuthJWTInterceptor } from '../token.interceptor';
import { NgxPasswordAuthStrategy } from './password-strategy';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'twitter',
  },
];

const DATA_SERVICES = [
  { provide: ApiData, useClass: ApiService },
  { provide: UserData, useClass: UserService },
  { provide: Htcs, useClass: HtcsService },
  { provide: CoolingModelData, useClass: CoolingModelService },
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
            success: '/cmodel',
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
        requestPass: {
          endpoint: '/api/auth/users/reset_password/',
          redirect: {
            success: null,
            failure: null,
          },
        },
        resetPass: {
          endpoint: '/api/auth/users/reset_password_confirm/',
          method: 'post',
          redirect: {
            success: null,
            failure: null,
          },
          resetPasswordTokenKey: 'token',
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
          // class: NbAuthOAuth2Token,
          // key: 'token',
          class: NbAuthJWTToken,
          key: 'token.access_token',
        },
        refreshToken: {
          endpoint: '/api/auth/jwt/refresh/',
          method: 'post',
          requireValidToken: false,
          redirect: {
            success: null,
            failure: '/auth/login',
          },
        },
        errors: {
          getter: (module, res, options) => {
            if (module === 'login') {
              return res.error ? res.error.detail : options[module].defaultErrors;
            }
            if (module === 'register') {
              console.log('res.error', res.error);
              return res.error
                ? res.error.email
                  ? res.error.email[0]
                  : res.error.password[0]
                : options[module].defaultErrors;
            }
            return res.error ? res.error.message : options[module].defaultErrors;
          },
        },
        // validation: {
        //   password: {
        //     required: true,
        //     minLength: 8,
        //     maxLength: 100
        //   },
        //   email: {
        //     required: true,
        //   }
        // }
      }),
    ],
    forms: {
      login: {
        socialLinks: [],
      },
      register: {
        socialLinks: [],
        terms: false,
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
  AuthGuard,
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
