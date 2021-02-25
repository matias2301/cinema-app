import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouritesPageRoutingModule } from './favourites-routing.module';

import { FavouritesPage } from './favourites.page';
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
    FavouritesPageRoutingModule,
    FormModalPageModule
  ],
  declarations: [FavouritesPage]
})
export class FavouritesPageModule {}
