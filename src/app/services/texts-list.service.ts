import { Injectable } from '@angular/core';
import { TextContent } from './textContent';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})


export class TextsListService {
  private readonly localStorageKey = 'textList';
  protected textList: TextContent[] = [];

  constructor(private localStorageService: LocalStorageService) {
    this.loadTextListFromLocalStorage();
  }

  private loadTextListFromLocalStorage(): void {
    const storedTextList = this.localStorageService.getItem(this.localStorageKey);
    this.textList = storedTextList ? JSON.parse(storedTextList) : this.textList;
  }

  getAllText(): TextContent[] {
    return this.textList;
  }
  getText(index: number): TextContent[] {
    return [this.textList[index]]
  }
  getTextById(id: number): TextContent[] {
    return this.textList.filter(item=> item.id == id)
  }
}
