import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from './card.component';
import { PipesModule } from '../../pipes/pipes.module';
import { IonicRatingComponentModule } from 'ionic-rating-component';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    IonicRatingComponentModule,
  ],
  exports: [CardComponent],
})
export class CardModule {}