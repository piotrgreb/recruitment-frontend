import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppMainComponent } from './app-main/app-main.component';
import { AppLocalStorageComponent } from './app-local-storage/app-local-storage.component';
import { AppFooterComponent } from './app-footer/app-footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, AppHeaderComponent, AppMainComponent, AppLocalStorageComponent, AppFooterComponent],

  template: `
  <app-header />
   <app-main />

   <app-app-footer />
    <router-outlet />

  `,
  styles: [],
})
export class AppComponent {
  title = 'recruitment-frontend';

}
