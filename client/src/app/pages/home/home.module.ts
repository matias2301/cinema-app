import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { IonicRatingComponentModule,  } from 'ionic-rating-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,    
    IonicModule,
    PipesModule,
    IonicRatingComponentModule,    
    HomePageRoutingModule,    
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
