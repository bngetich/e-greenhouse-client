import { Component, OnInit, Input } from '@angular/core';
import { Feed } from 'src/app/resources/models/Feed';
import { FeedService } from 'src/app/resources/feed.service';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent implements OnInit {
  data: any[];
  feeds: Feed[] = [];
  @Input() sensorType: string;
  view: any[] = [400, 400];
  legend = true;
  legendPosition = 'below';
  colorScheme = {
    domain: ['#3f51b5']
  };

  constructor(private feedService: FeedService) {}

  ngOnInit() {
    this.feedService.observeMessagesSubject.subscribe(feedString => {
      const jsonObj = JSON.parse(feedString);
      const feed: Feed = jsonObj as Feed;
      this.feeds.push(feed);
      this.feeds.map(x => {
        if (this.sensorType === 'Temperature') {
          this.data = [{ name: this.sensorType, value: x.field1 }];
        } else if (this.sensorType === 'Humidity') {
          this.data = [{ name: this.sensorType, value: x.field2 }];
        } else if (this.sensorType === 'Soil Moisture') {
          this.data = [{ name: this.sensorType, value: x.field3 }];
        }
      });
    });
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
