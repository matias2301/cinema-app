import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { CardModule } from '../../components/card/card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,    
    IonicModule,    
    CardModule,             
    HomePageRoutingModule,     
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
