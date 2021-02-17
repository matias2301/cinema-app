import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;

  constructor(
              private authService: AuthService,
              private router: Router,
              public formBuilder: FormBuilder
             ){
              this.createForm();
              }

  ngOnInit() {}  

  // login(form){
  //   this.authService.login(form.value).subscribe((res)=>{
  //     this.router.navigateByUrl('home');
  //   });
  // }

  get username_valid() {
    return this.validations_form.get('email').invalid && (this.validations_form.get('email').dirty || this.validations_form.get('email').touched);
  }

  get password_valid() {
    return this.validations_form.get('password').invalid && (this.validations_form.get('password').dirty || this.validations_form.get('password').touched);
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

  onSubmitLogin(){    

    if( this.validations_form.invalid ){
      Object.values( this.validations_form.controls ).forEach( control => {
        control.markAsTouched();
      });
    }       
    
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