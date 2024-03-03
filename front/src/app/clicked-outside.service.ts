import { ElementRef, Injectable } from '@angular/core';
import { Observable, filter, fromEvent, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClickedOutsideService {
  private clicks$: Observable<Event> = fromEvent(document, 'click');
  constructor() {}

  clickedOutside(elementRef: ElementRef): Observable<Event> {
    return this.clicks$.pipe(
      map((event) => elementRef.nativeElement.contains(event.target)),
      filter((isInside) => !isInside)
    );
  }
}
