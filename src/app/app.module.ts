/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { NbAuthJWTInterceptor, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { NgxAuthJWTInterceptor } from './token.interceptor';
import { HeaderInterceptor } from './header.interceptor';
import { APP_BASE_HREF } from '@angular/common';
import { AuthGuard } from './@core/auth-guard.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    /**
     * Approach 1
     */
    {
      provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
      useValue: function (req: HttpRequest<any>) {
        return req.url === '/api/auth/jwt/refresh/';
      },
    },
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },

    /**
     * Approach 2
     */
    // { provide: APP_BASE_HREF, useValue: '/' },
    // { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    // {
    //   provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
    //   useValue: req => {
    //     return false;
    //   },
    // },

    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }, // header config interceptor

    // { provide: HTTP_INTERCEPTORS, useClass: NgxAuthJWTInterceptor, multi: true },  // custom token name -> "JWT" interceptor
  ],
})
export class AppModule {
}
