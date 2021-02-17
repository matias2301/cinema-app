import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from '../interfaces/user';
import { AuthResponse } from '../interfaces/auth-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER_ADDRESS: string = 'http://localhost:4000';
  authSubject = new BehaviorSubject(false);

  constructor(
              private httpClient: HttpClient,
              private storage: Storage
             ) { }

    register(user: User): Observable<any> {
      return this.httpClient
      .post<any>(`${this.AUTH_SERVER_ADDRESS}/api/users`, user)
      .pipe(
        map ( res => res ),
        // catchError( err => {
        //   console.log('error en authservice', err)          
        //   return throwError(err);
        // })
      )
        // tap(async (res:  AuthResponse ) => {          
          // if (res.user) {
          //   await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          //   await this.storage.set("EXPIRES_IN", res.user.expires_in);
          //   this.authSubject.next(true);
          // }
      //   })
      
      // );
    }

    login(user: User): Observable<AuthResponse> {
      return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
        tap(async (res: AuthResponse) => {
  
          if (res.user) {
            await this.storage.set("ACCESS_TOKEN", res.user.access_token);
            await this.storage.set("EXPIRES_IN", res.user.expires_in);
            this.authSubject.next(true);
          }
        })
      );
    }

    async logout() {
      await this.storage.remove("ACCESS_TOKEN");
      await this.storage.remove("EXPIRES_IN");
      this.authSubject.next(false);
    }

    isLoggedIn() {
      return this.authSubject.asObservable();
    }
}