import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {

  @Input() type: string;
  // @Input() placeholder: string;
  @Input() iconName?: string;
  @Input() label: string;
  @Input() name: string;
  @Input() formControlName: string;

  constructor() { } 

}