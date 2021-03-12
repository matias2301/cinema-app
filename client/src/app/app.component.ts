import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';
import { AlertsService } from './services/alerts.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public isLoggedIn: boolean;

  public appPages = [    
    {
      title: 'My Favourites',
      url: '/favourites',
      icon: 'list'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,    
    private authService: AuthService,
    private alertsService: AlertsService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authSubject.subscribe(state => {        
        if (state) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      });

    });
    
  }

  register(){
    this.router.navigate(['register']);
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  logout(){
    this.authService.logout()
      .then( () => this.alertsService.alertToast('You are logged out', 'error'));
  }

}