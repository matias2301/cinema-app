import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.page.html',
  styleUrls: ['./forgot-pass.page.scss'],
})
export class ForgotPassPage {  

  form = {
    email: ''
  }

  constructor() { }

  onSubmit( form: NgForm ) {
    if( form.invalid ){
      Object.values( form.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
    console.log('Submit disparado', form.value );
  }
}
