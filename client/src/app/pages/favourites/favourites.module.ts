import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouritesPageRoutingModule } from './favourites-routing.module';
import { FavouritesPage } from './favourites.page';
import { FormModalPageModule } from 'src/app/modals/form-modal/form-modal.module';
import { CardModule } from '../../components/card/card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,    
    CardModule,        
    FavouritesPageRoutingModule,
    FormModalPageModule
  ],
  declarations: [FavouritesPage]
})
export class FavouritesPageModule {}
