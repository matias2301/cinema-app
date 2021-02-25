import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormModalPageRoutingModule } from './form-modal-routing.module';
import { IonicRatingComponentModule,  } from 'ionic-rating-component';

import { FormModalPage } from './form-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicRatingComponentModule,
    FormModalPageRoutingModule
  ],
  declarations: [FormModalPage],  
})
export class FormModalPageModule {}

