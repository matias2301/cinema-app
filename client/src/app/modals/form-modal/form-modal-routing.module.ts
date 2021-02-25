import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormModalPage } from './form-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FormModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormModalPageRoutingModule {}
