import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../../pipes/pipes.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { CardComponent } from '../../components/card/card.component';
import { IonicRatingComponentModule } from 'ionic-rating-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,    
    IonicModule, 
    PipesModule,             
    HomePageRoutingModule, 
    IonicRatingComponentModule,   
  ],
  declarations: [HomePage, CardComponent]
})
export class HomePageModule {}
