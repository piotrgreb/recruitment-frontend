import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private classAdded = new Subject<boolean>();

  classAdded$ = this.classAdded.asObservable();

  addClass() {
    this.classAdded.next(true);
  }
}


