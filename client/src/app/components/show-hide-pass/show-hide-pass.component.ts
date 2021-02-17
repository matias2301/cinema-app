import { Component, ContentChild } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-show-hide-pass',
  templateUrl: './show-hide-pass.component.html',
  styleUrls: ['./show-hide-pass.component.scss'],
})
export class ShowHidePassComponent {

  showPassword = false;
  @ContentChild(IonInput) input: IonInput;

  constructor() { }

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }

}
