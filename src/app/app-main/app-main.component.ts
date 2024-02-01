import { Component, OnInit } from "@angular/core";
import { RadioButtonComponent } from "../ui/radio/radio.component";
import { CommonModule } from "@angular/common";
import { TextsListService } from "../services/texts-list.service";
import { TextContent } from "../services/textContent";
import { AppLocalStorageComponent } from "../app-local-storage/app-local-storage.component";
@Component({
  selector: "app-main",
  standalone: true,
  imports: [RadioButtonComponent, CommonModule, AppLocalStorageComponent],
  template: `
    <div class="main">
      <h1 class="main__h1">Nagłówek H1</h1>
      <div class="main__container">
        <div class="main__block">
          <h2 main>Blok pierwszy</h2>
          <div class="main__radio">
            <radio-button
              radioName="group"
              textLabel="Opcja pierwsza"
              (change)="changeOption('option1')"
              [isChecked]="option === 'option1'"
            />
            <radio-button
              radioName="group"
              textLabel="Opcja druga"
              (change)="changeOption('option2')"
              [isChecked]="option === 'option2'"
            />
            <radio-button
              radioName="group"
              textLabel="Opcja losowa"
              (change)="changeOption('option3')"
              [isChecked]="option === 'option3'"
            />
          </div>
        </div>
        <div class="main__block">
          <h2>Blok drugi</h2>
          <div class="main__buttons">
            <button class="main__button" (click)="changeText()">Zastąp</button>
            <button class="main__button"(click)="addText()">Doklej</button>
          </div>
        </div>
        <div class="main__block">
          <h2>Tekst który sam się przycina, tekst który sam się przycina, tekst który sam się przycina.</h2>
          <p *ngFor="let textContent of textContentList">
            {{ textContent.text }}
          </p>
        </div>
      </div>
    </div>
    <app-app-local-storage />
  `,
  styleUrls: ["./app-main.component.scss"],
})
export class AppMainComponent implements OnInit {
  textContentList: TextContent[] = [];
  option: string = Option.Option1;
  previousIndex: number = 1;
  listLength: number = this.textList["textList"].length;
  constructor(private textList: TextsListService) {}

  ngOnInit(): void {
    this.option = Option.Option1;
    
  }
  get sortedTextContentList() {
    return this.textContentList.slice().sort((a, b) => a.text.localeCompare(b.text));
  }
  changeOption(selectedOption: string): void {
    this.option = selectedOption;
  }

  changeText(): void {
    if (this.option === Option.Option1) {
     this.updateTextList(0);
    this.textList.getText(0);
    } else if (this.option === Option.Option2) {
      this.updateTextList(1);
      this.textList.getText(1);
    } else {
      let randomIndex: number;
      do {
        randomIndex = this.getRandomNumber();
      } while (randomIndex === this.previousIndex);
      this.updateTextList(randomIndex);
    }
  }

  addText(): void {
    let newText: TextContent | undefined;
    if (this.option === Option.Option1 && !this.isTextAlreadyAdded(0)) {
      newText = this.textList.getText(0)[0];
    } else if (this.option === Option.Option2 && !this.isTextAlreadyAdded(1)) {
      newText = this.textList.getText(1)[0];
    } else if (this.option === Option.Option3 && this.listLength > this.textContentList.length) {
      let randomIndex: number;
      do {
        randomIndex = this.getRandomNumber();
      } while (this.isTextAlreadyAdded(randomIndex));
  
      newText = this.textList.getTextById(randomIndex)[0];
      this.previousIndex = randomIndex;
    } else {
      alert("Nie można dodać tekstu!");
      return; 
    }
  
    if (newText) {
      this.textContentList = [...this.textContentList, newText].sort((a, b) => a.text.localeCompare(b.text));
    }
  }

  getRandomNumber(): number {
    const arrayLength = this.textList.getAllText().length;
    return Math.floor(Math.random() * arrayLength);
  }

  private updateTextList(index: number): void {
    this.textContentList =  this.textList.getText(index);
    this.previousIndex = this.textList.getText(index)[0].id;
  }

  private isTextAlreadyAdded(index: number): boolean {
    return this.textContentList.some((item) => item.id === index);
  }
}

const Option = {
  Option1: "option1",
  Option2: "option2",
  Option3: "option3",
};
