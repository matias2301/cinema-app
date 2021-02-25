import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { IonicRatingComponentModule,  } from 'ionic-rating-component';
import { FormModalPageModule } from 'src/app/modals/form-modal/form-modal.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    IonicRatingComponentModule, 
    DetailsPageRoutingModule,
    FormModalPageModule
  ],
  declarations: [DetailsPage],  
})
export class DetailsPageModule {}
