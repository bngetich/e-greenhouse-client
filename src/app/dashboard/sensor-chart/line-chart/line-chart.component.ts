import { Component, OnInit, Input } from '@angular/core';
import { Feed } from 'src/app/resources/models/Feed';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  data: Array<number> ;
  @Input() feeds: any[];
  @Input() sensorType: string;
  view: any[] = [700, 300];

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
  timeline = true;

  constructor() {}

  ngOnInit() {
    console.log('sensor type::', this.sensorType);
    if (this.sensorType === 'Temperature') {
      this.data = this.feeds.map(x => x.field1);
      console.log(this.data);
    } else if (this.sensorType === 'Humidity') {
      this.data = this.feeds.map(x => x.field2);
    } else if (this.sensorType === 'Soil Moisture') {
      this.data = this.feeds.map(x => x.field3);
    }
    console.log('feeds;;', this.feeds);

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
