import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeedService } from '../resources/feed.service';
import { Feed } from '../resources/models/Feed';
import { Subscription } from 'rxjs';
import { EventSourcePolyfill } from 'ng-event-source';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private sseStream: Subscription;
  feeds: Array<Feed> = [];

  constructor(
    private feedService: FeedService,
    private oktaAuth: OktaAuthService
  ) {}

  async ngOnInit() {
    const accessToken = await this.oktaAuth.getAccessToken();
    this.sseStream = this.feedService
      .observeMessages('//localhost:8080/egreenhouse/feeds', accessToken)
      .subscribe(feed => {
        this.feeds.push(feed);
      });
  }

  ngOnDestroy() {
    if (this.sseStream) {
      this.sseStream.unsubscribe();
    }
  }
}
