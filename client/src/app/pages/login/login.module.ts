import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ShowHidePassModule } from '../../components/show-hide-pass/show-hide-pass-module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,    
    ReactiveFormsModule,
    ShowHidePassModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
