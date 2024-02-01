import { Component, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { AppStateService } from '../services/state.service';
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
  <label for="toggleClassCheckbox" class="footer--show">Pokaż
  <svg width="16px" height="16px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M478.312 644.16c24.38 26.901 64.507 26.538 88.507-0.89l270.57-309.222c7.758-8.867 6.86-22.344-2.008-30.103-8.866-7.759-22.344-6.86-30.103 2.007L534.71 615.173c-7.202 8.231-17.541 8.325-24.782 0.335L229.14 305.674c-7.912-8.73-21.403-9.394-30.133-1.482s-9.394 21.403-1.482 30.134l280.786 309.833z" fill="" /></svg>
  </label>

    <div class="footer__show--select active">
      <a (click)="restoreToInitialState()">&rsaquo;	 Zresetuj ustawienia</a>
      <a (click)="showName()">&rsaquo; Pokaz dane osobowe</a>
    </div>
  </div>
  </footer>
  `,
 styleUrls: ['./app-footer.component.scss']

})
export class AppFooterComponent {
  @Output() restoreClick = new EventEmitter<void>();

  constructor(private sharedService: SharedService, private stateService: AppStateService) { }
  showName() {
    this.sharedService.addClass();
  }

restoreToInitialState(): void {
 // this.restoreClick.emit();
  this.stateService.emitRestoreClick();
}
}
