import { Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private appState: any;
  private initialState: any;
  restoreClick = new EventEmitter<void>();

  emitRestoreClick(): void {
    this.restoreClick.emit();
  }

  getInitialState(): any {
    return this.initialState;
  }
}
