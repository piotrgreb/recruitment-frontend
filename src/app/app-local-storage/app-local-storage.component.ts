import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { LocalStorageService } from "../services/local-storage.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import * as textsData from "../../data.json";
import { TextContent } from "../services/textContent";
import { AppStateService } from "../services/state.service";

@Component({
  selector: "app-app-local-storage",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h3>Zadanie na 6</h3>
    <div class="storage">
      <div class="storage__item" *ngFor="let text of savedTexts; let i = index">
        <textarea
          [(ngModel)]="savedTexts[i].text"
          placeholder="Edit text"
        ></textarea>
        <button (click)="removeText(i)">Usuń</button>
      </div>
      <div class="storage__btn">
        <button (click)="saveEditedTexts()">Zapisz</button>
      </div>
    </div>
  `,
  styleUrls: ["./app-local-storage.component.scss"],
})
export class AppLocalStorageComponent implements OnInit {
  @Output() restoreClick = new EventEmitter<void>();

  constructor(
    private localStorageService: LocalStorageService,
    private stateService: AppStateService
  ) {}

  data: any = textsData;
  savedTexts: TextContent[] = [];

  ngOnInit() {
    this.saveInitToLocalStorage();
    this.loadFromLocalStorage();
    this.stateService.restoreClick.subscribe(() => {
      this.saveInitToLocalStorage();
      this.loadFromLocalStorage();
    });
  }

  async saveInitToLocalStorage() {
    try {
      this.localStorageService.setItem(
        "textList",
        JSON.stringify(this.data.data)
      );
    } catch (error) {
      console.error("Error ", error);
    }
  }

  async saveToLocalStorage() {
    try {
      this.localStorageService.setItem(
        "textList",
        JSON.stringify(this.savedTexts)
      );
    } catch (error) {
      console.error("Error ", error);
    }
  }

  loadFromLocalStorage() {
    try {
      const storedTexts = this.localStorageService.getItem("textList");
      if (storedTexts) {
        this.savedTexts = JSON.parse(storedTexts);
        console.log(this.savedTexts);
      }
    } catch (error) {
      console.error("Error ", error);
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
