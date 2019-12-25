import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedService } from '../resources/feed.service';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  sensorTypes: string[] = ['Temperature', 'Humidity', 'Soil Moisture'];
  private sseStream: Subscription;
  sseUrl = '//localhost:8080/egreenhouse/feeds';

  constructor(
    private feedService: FeedService,
    private oktaAuth: OktaAuthService
  ) {}

  async ngOnInit() {
    const accessToken = await this.oktaAuth.getAccessToken();
    this.sseStream = this.feedService
      .observeMessages(this.sseUrl, accessToken)
      .subscribe();
  }

  ngOnDestroy() {
    if (this.sseStream) {
      this.sseStream.unsubscribe();
    }
  }
}
