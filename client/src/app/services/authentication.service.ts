import { Platform, LoadingController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  SERVER_URL: string = 'http://localhost:4000';
  authenticationState = new BehaviorSubject(false); 

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController,
    private storage: Storage, 
    private plt: Platform,
    private router: Router,
    public alertController: AlertController
    ) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  register(user) {
    
    // const uploadData = new FormData();
    // uploadData.append('name', values.name);    
    // uploadData.append('email', values.email);
    // uploadData.append('password', values.matching_passwords.password);        
    
    this.loadingController.create({keyboardClose: true, message: 'Loging In ...'})
      .then(loadingEl => {
        loadingEl.present(); // show loading
        this.http.post<any>(`${this.SERVER_URL}/api/users`, user)
        .subscribe(
          res => {

            if (res.isSuccess) {
                this.showAlert(res.msg);
                this.router.navigateByUrl('login');
              // return this.storage.set(TOKEN_KEY, res.tokenKey).then(() => {
              //   this.authenticationState.next(true);              
              // });
            } else {
              this.showAlert('Please verify the data submitted');
            }
            loadingEl.dismiss(); // hide loading
          },
          err => {            
            loadingEl.dismiss();
            this.showAlert(err.error.msg);
          }
        );
      });
  }

  login(values) {
    
    const uploadData = new FormData(); // declar form object
    uploadData.append('email', values.email);
    uploadData.append('password', values.password);
    
    this.loadingController.create({keyboardClose: true, message: 'Loging In ...'})
      .then(loadingEl => {
        loadingEl.present(); // show loading
        this.http.post<any>('http://example.com/api', uploadData)
        .subscribe(
          res => {
            loadingEl.dismiss(); // hide loading
            // example return data 
            // res = { isSuccess: true, tokenKey: 'token-key', others: 'others..' }
            if (res.isSuccess) { 
              return this.storage.set(TOKEN_KEY, res.tokenKey).then(() => {
                this.authenticationState.next(true);
              });
            } else {
              this.showAlert('Username or Password Invalid');
              this.logout();
            }
          },
          err => {
            this.logout();
            console.log(err);
          }
        );
      });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
      this.router.navigate(['login']);
    });
  }
 
  isAuthenticated() {
    if (!this.authenticationState.value) {
      this.router.navigate(['login']);
    }
    return this.authenticationState.value;
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      header: 'Information Message',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  } 

  

  // async registerFailedAlert(str) {
  //   const alert = await this.alertController.create({
  //     header: 'Registration Invalid!',
  //     message: str,
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // } 

  // async loginFailedAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Login Invalid!',
  //     message: 'Please login with valid username and password.',
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }

}