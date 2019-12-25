import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { EventSourcePolyfill } from 'ng-event-source';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private observeMessagesObservable: Observable<string>;
  observeMessagesSubject = new ReplaySubject<string>(1);
  constructor() {}

  observeMessages(sseUrl: string, accessToken: any): ReplaySubject<string> {
    this.observeMessagesObservable = new Observable<any>(obs => {
      const eventSource = new EventSourcePolyfill(sseUrl, {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });
      eventSource.onmessage = message => {
        obs.next(message.data);
      };
      return () => eventSource.close();
    });

    this.observeMessagesObservable.subscribe({
      complete: () => this.observeMessagesSubject.complete(),
      error: x => this.observeMessagesSubject.error(x),
      next: x => this.observeMessagesSubject.next(x)
    });

    return this.observeMessagesSubject;
  }
}
