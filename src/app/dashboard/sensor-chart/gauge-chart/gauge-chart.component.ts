import { Component, OnInit } from '@angular/core';
import { Feed } from 'src/app/resources/models/Feed';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent implements OnInit {
  data: number[];
  feeds: Array<Feed>;
  sensorType: string;

  constructor() { }

  ngOnInit() {
    if (this.sensorType === 'Temperature') {
      this.data = this.feeds.map(x => x.field1);
    } else if (this.sensorType === 'Humidity') {
      this.data = this.feeds.map(x => x.field2);
    } else if (this.sensorType === 'Soil Moisture') {
      this.data = this.feeds.map(x => x.field3);
    }
  }

}
