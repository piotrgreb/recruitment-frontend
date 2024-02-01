import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { CommonModule } from '@angular/common';

import * as textsData from '../../data.json';
import { TextContent } from '../services/textContent';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-app-local-storage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <p>
      <button (click)="saveToLocalStorage()">Save to Local Storage</button>
      <button (click)="saveEditedTexts()">Save Edited Texts</button>
    </p>
    <div *ngFor="let text of savedTexts; let i = index">
      <textarea [(ngModel)]="savedTexts[i].text" placeholder="Edit text"></textarea>
      <button (click)="removeText(i)">x</button>
    </div>
  `,
  styles: ``
})
export class AppLocalStorageComponent implements OnInit {

    constructor(private localStorageService: LocalStorageService) { 
    }

    data: any = textsData;
    savedTexts: TextContent[] = [];

    ngOnInit() {
      this.saveInitToLocalStorage();
      this.loadFromLocalStorage();
    }
  async saveInitToLocalStorage() {
    try {
      this.localStorageService.setItem('textList', JSON.stringify(this.data.data));
    } catch (error) {
      console.error('Error ', error);
    }
  }
    async saveToLocalStorage() {
      try {
        this.localStorageService.setItem('textList', JSON.stringify(this.savedTexts));
      } catch (error) {
        console.error('Error ', error);
      }
    }

    loadFromLocalStorage() {
      try {
        const storedTexts = this.localStorageService.getItem('textList');
        if (storedTexts) {
          this.savedTexts = JSON.parse(storedTexts);
          console.log(this.savedTexts);
        }
      } catch (error) {
        console.error('Error ', error);
      }
    }

    saveEditedTexts() {
      this.saveToLocalStorage(); 
    }

    removeText(index: number) {
      this.savedTexts.splice(index, 1);
      this.saveToLocalStorage(); 
    }
}
