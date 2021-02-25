import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  error: boolean;
  msjError: string;

  constructor(
              private authService: AuthService,
              private alertsService: AlertsService,
              private router: Router,
              public formBuilder: FormBuilder,
              private loadingController: LoadingController,                                                   
             ){
              this.createForm();
              }

  ngOnInit() {
    this.checkLoginState();
  }  

  get username_valid() {
    return this.validations_form.get('email').invalid && (!this.validations_form.get('email').dirty && this.validations_form.get('email').touched);
  }

  get password_valid() {
    return this.validations_form.get('password').invalid && (!this.validations_form.get('password').dirty && this.validations_form.get('password').touched);
  }

  createForm() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,        
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9!$%@#£€*?&-_]+$')
      ]))
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain uppercase, lowercase, special chars and number.' }
    ],
  };

  onSubmitLogin(values){    

    if( this.validations_form.invalid ){
      Object.values( this.validations_form.controls ).forEach( control => {
        control.markAsTouched();
      });
    } else {      
      const user = {        
        email: values.email,
        password: values.password
    }       
    
    this.error = false;

    this.loadingController.create({keyboardClose: true, message: 'Loggin In ...'})
    .then(loadingEl => {
      loadingEl.present(); // show loading

      this.authService.login(user)
        .subscribe((res) => {
          if (res.isSuccess) {
            this.alertsService.alertToast(res.msg, 'success');
            this.validations_form.reset();
            this.router.navigateByUrl('home');
          } 
          loadingEl.dismiss(); // hide loading

          }, ( err ) => {
            loadingEl.dismiss();
            this.error = true;
            this.msjError = err.error.msg || 'Something went wrong!';
            setTimeout(() => {
              this.error = false;
              this.msjError = '';
            }, 3000);
          }                        
        );
      });
    }
  }

  // CHECK LOGIN STATE
  checkLoginState(){
    this.authService.authSubject.subscribe( state => {
      if (state) {
        this.router.navigateByUrl('home');
      }
    });
  }

  // GO TO REGISTER PAGE
  goToRegister(){
    this.validations_form.reset();
    this.router.navigateByUrl('register');
  }

  // GO TO FORGOT-PASS PAGE
  goToForgotPass(){
    this.validations_form.reset();
    this.router.navigateByUrl('forgot-pass');
  }
}