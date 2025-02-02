import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { User } from '../interfaces/user';
import { AuthResponse } from '../interfaces/auth-response';

const ACCESS_TOKEN = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER_ADDRESS: string = 'http://localhost:4000';
  // AUTH_SERVER_ADDRESS: string = 'https://lit-forest-87722.herokuapp.com';
  authSubject = new BehaviorSubject(false);

  constructor(
              private httpClient: HttpClient,
              private storage: Storage,
              private plt: Platform,
              private router: Router,
             ) {
              this.plt.ready().then(() => {
                this.checkToken();
              });
             }

    checkToken() {
      this.storage.get(ACCESS_TOKEN).then( res => {
        if (res) {
          this.authSubject.next(true);
        }
      });
    }

    register(user: User): Observable<AuthResponse> {
      return this.httpClient
      .post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/users`, user)
      .pipe(
        map( res => res ),
        // catchError( err => {
        //   console.log('error en authservice', err)          
        //   return throwError(err);
        // })
      )
    }

    login(user: User): Observable<AuthResponse> {
      return this.httpClient
      .post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/auth`, user)
      .pipe(
        map( res => {          
          if (res.isSuccess) {            
            this.storage.set(ACCESS_TOKEN, res.token).then(() => {
              this.authSubject.next(true);
            });                   
          }  
          return res 
        }),
      );
    }

    async logout() {

      return this.storage.remove(ACCESS_TOKEN)
        .then(() => {
          // this.storage.remove("EXPIRES_IN");
          this.authSubject.next(false);
          this.router.navigateByUrl('home');
        });
    }

    // isLoggedIn() {
    //   return this.authSubject.asObservable();
    // }

    isAuthenticated() {
      if (!this.authSubject.value) {
        this.router.navigateByUrl('login');
      }
      return this.authSubject.value;
    }
}