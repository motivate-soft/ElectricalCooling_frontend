import { Observable } from 'rxjs';

export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export abstract class UserData {
  abstract getUser(id: any): Observable<User>;
  abstract getUsers(): Observable<User[]>;
  abstract updateUser(user: User): Observable<User>;
}
