import { Component, Input } from '@angular/core';

@Component({
  selector: 'radio-button',
  standalone: true,
  template: `
  <div class="options">
    <input type="radio" [name]="radioName" [id]="radioId" [checked]="isChecked" >
    <label [for]="radioId"> {{ textLabel }}</label>
  </div>
  `,
  styleUrls: ["./radio.component.scss"],

})
export class RadioButtonComponent {
  @Input() radioName: string = ''; 
  @Input() textLabel: string = ''; 
  @Input() isChecked: boolean = false; // Declare isChecked as an Input property

  radioId: string = `radio-${Math.random().toString(36).substr(2, 5)}`; 
}