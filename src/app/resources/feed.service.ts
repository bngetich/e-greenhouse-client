import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventSourcePolyfill } from 'ng-event-source';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  constructor() {}

  observeMessages(sseUrl: string, accessToken: any): Observable<any> {
    return new Observable<any>(obs => {
      console.log(accessToken);
      const eventSource = new EventSourcePolyfill(sseUrl, {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });
      eventSource.onmessage = message => {
        console.log(message.data);
        obs.next(message.data);
      };
      return () => eventSource.close();
    });
  }
}
