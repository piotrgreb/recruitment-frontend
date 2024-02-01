import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-app-footer',
  standalone: true,
  imports: [],
  template: `
  <footer class="footer">
    <div class="footer__logo">
    <div class="footer__logo-back">
      </div>
  <p class="footer__logo-text">CSS<br>is<br>awesome</p>
  </div>
  <div class="footer__name">
    nabthat
  </div>
  <div class="footer__show">
    
  <input type="checkbox" id="toggleClassCheckbox"  >
  <label for="toggleClassCheckbox" class="footer--show">Dodaj klasę 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-down">
  <polygon points="12 18 18 12 6 12"></polygon>
</svg>
  </label>

    <div class="footer__show--select active">
      <button>Zresetuj ustawienia</button>
      <button  (click)="showName()">Pokaz dane osobowe</button>
    </div>
  </div>
  </footer>
  `,
 styleUrls: ['./app-footer.component.scss']

})
export class AppFooterComponent {
  constructor(private sharedService: SharedService) { }

  showName() {
    this.sharedService.addClass();
  }
}
