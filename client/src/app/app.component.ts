import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';
import { AlertsService } from './services/alerts.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public isLoggedIn: boolean;
  public appPages = [];

  public publicPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    },
    {
      title: 'Register',
      url: '/register',
      icon: 'person-add'
    },
  ];

  public privatePages = [    
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
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
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.authService.authSubject.subscribe(state => {        
      if (state) {
        this.appPages = this.privatePages;
        this.isLoggedIn = true;
      } else {
        this.appPages = this.publicPages;
        this.isLoggedIn = false;
      }
    });
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    
  }

  logout(){
    this.authService.logout()
      .then( () => this.alertsService.alertToast('You are logged out', 'error'));
  }

}