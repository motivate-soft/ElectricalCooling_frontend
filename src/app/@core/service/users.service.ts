import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User, UserData } from '../data/users';
import { ApiService } from './api.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Injectable()
export class UserService extends UserData {
  user: User

  constructor(private apiService: ApiService,
    private authService: NbAuthService) {
    super()
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });

  }
  getUser(id = ''): Observable<User> {
    return this.apiService
      .get(
        '/auth/users/me/',
      )
  }

  getUsers(): Observable<any> {
    return this.apiService
      .get(
        '/auth/users',
      )
  }

  updateUser(user: User): Observable<User> {
    return this.apiService
      .put(
        '/auth/users/me/', user
      )
  }

  setPassword(auth: any) {
    return this.apiService.post('/auth/users/set_password/', auth)
  }

  resetPassword(data: any) {
    const auth = {
      ...data,
      email: this.user.email
    }
    return this.apiService.post('/auth/users/reset_password/', auth)
  }
}
