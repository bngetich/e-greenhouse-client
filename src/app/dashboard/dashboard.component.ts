import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeedService } from '../resources/feed.service';
import { Feed } from '../resources/models/Feed';
import { Subscription } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private sseStream: Subscription;
  public feeds: any[] = [];
  sensorTypes: string[] = ['Temperature', 'Humidity', 'Soil Moisture'];
  temp: Feed;

  constructor(
    private feedService: FeedService,
    private oktaAuth: OktaAuthService
  ) {}

  async ngOnInit() {
    const accessToken = await this.oktaAuth.getAccessToken();
    this.sseStream = this.feedService
      .observeMessages('//localhost:8080/egreenhouse/feeds', accessToken)
      .subscribe(feedString => {
        const jsonObj: any = JSON.parse(feedString); // string to generic object first
        const feed: Feed =  jsonObj as Feed;
        this.temp = feed;
        this.feeds.push(feed);
      });
  }

  ngOnDestroy() {
    if (this.sseStream) {
      this.sseStream.unsubscribe();
    }
  }
}
