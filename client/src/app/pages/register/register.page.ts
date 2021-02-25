import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from  "@angular/router";
import { LoadingController } from '@ionic/angular';

//Validators
import { PasswordValidator } from '../../validators/password.validator';

//Services
import { AuthService } from '../../services/auth.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  
  error: boolean;
  msjError: string;

  constructor(              
              private authService: AuthService,
              private alertsService: AlertsService,
              private router: Router,
              public formBuilder: FormBuilder,              
              private loadingController: LoadingController
             ) { 
              this.createForm();
             }

  ngOnInit() {
    this.checkLoginState();
  }

  get name_valid() {
    return this.validations_form.get('name').invalid && (this.validations_form.get('name').dirty || this.validations_form.get('name').touched);
  }

  get username_valid() {
    return this.validations_form.get('email').invalid && (this.validations_form.get('email').dirty || this.validations_form.get('email').touched);
  }

  get password_valid() {
    return this.validations_form.get('matching_passwords').get('password').invalid && (this.validations_form.get('matching_passwords').get('password').dirty || this.validations_form.get('matching_passwords').get('password').touched);
  }

  get confirmPass_valid() {
    return this.validations_form.get('matching_passwords').get('confirmPass').invalid && (this.validations_form.get('matching_passwords').get('confirmPass').dirty || this.validations_form.get('matching_passwords').get('confirmPass').touched);
  }

  get matchingPass_valid() {
    return this.validations_form.get('matching_passwords').invalid && (this.validations_form.get('matching_passwords').get('confirmPass').dirty || this.validations_form.get('matching_passwords').get('confirmPass').touched);
  }

  createForm() {
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9!$%@#£€*?&-_]+$')
      ])),
      confirmPass: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([        
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
    });

  }

  validation_messages = {
    'name': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain uppercase, lowercase, special chars and number.' }
    ],
    'confirmPass': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
  };

  // SUBMIT REGISTER
  onSubmitRegister(values){
    if( this.validations_form.invalid ){
      Object.values( this.validations_form.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    } else {      
      const user = {
        name: values.name,
        email: values.email,
        password: values.matching_passwords.password
    }      
    
    this.error = false;

    this.loadingController.create({keyboardClose: true, message: 'Registering ...'})
    .then(loadingEl => {
      loadingEl.present(); // show loading

      this.authService.register(user)
        .subscribe((res) => {
          if (res.isSuccess) {            
            this.alertsService.alertModal(`${res.msg} Please Log In`, 'success');
            this.validations_form.reset();
            this.router.navigateByUrl('login');
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

  // GO TO LOGIN PAGE
  goToLogin(){
    this.validations_form.reset();
    this.router.navigateByUrl('login');
  }
}
