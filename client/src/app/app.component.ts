// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
// })
// export class AppComponent {
//   constructor() {}
// }
import { Router } from '@angular/router';
// import { AuthenticationService } from './services/authentication.service';
import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public isLoggedIn: boolean;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private authenticationService: AuthenticationService,
    private authService: AuthService,
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

  logout(){
    this.authService.logout();
  }

}