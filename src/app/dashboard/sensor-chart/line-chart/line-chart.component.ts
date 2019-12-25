import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Feed } from 'src/app/resources/models/Feed';
import { FeedService } from 'src/app/resources/feed.service';
import * as moment from 'moment';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input() sensorType: string;
  feeds: Feed[] = [];
  data: any = [];

  view: any[] = [700, 400];

  // options
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  yAxisLabel = '';
  autoScale = true;
  colorScheme = {
    domain: ['#3f51b5']
  };

  constructor(
    private feedService: FeedService
  ) {}

  async ngOnInit() {
    this.data = [
      {
        name: this.sensorType,
        series: []
      }
    ];
    this.feedService.observeMessagesSubject.subscribe(feedString => {
      const jsonObj = JSON.parse(feedString); // string to generic object first
      const feed: Feed = jsonObj as Feed;
      this.feeds.push(feed);
      this.feeds.map(x => {
        if (this.sensorType === 'Temperature') {
          this.data[0].series.push({
            name: moment(x.created_at).format('hh:mm'),
            value: x.field1
          });
          this.data = [...this.data];
        } else if (this.sensorType === 'Humidity') {
          this.data[0].series.push({
            name: moment(x.created_at).format('hh:mm'),
            value: x.field2
          });
          this.data = [...this.data];
        } else if (this.sensorType === 'Soil Moisture') {
          this.data[0].series.push({
            name: moment(x.created_at).format('hh:mm'),
            value: x.field3
          });
          this.data = [...this.data];
        }
      });
    });
    // console.log('data::', this.data);
    this.yAxisLabel = this.sensorType;
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
