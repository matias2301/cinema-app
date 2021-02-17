import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShowHidePassComponent } from './show-hide-pass.component';

@NgModule({
  declarations: [ShowHidePassComponent],
  imports: [CommonModule, IonicModule],
  exports: [ShowHidePassComponent],
})
export class ShowHidePassModule {}