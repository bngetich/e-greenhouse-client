import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FeedService } from './resources/feed.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SensorChartComponent } from './dashboard/sensor-chart/sensor-chart.component';
import { GaugeChartComponent } from './dashboard/sensor-chart/gauge-chart/gauge-chart.component';
import { LineChartComponent } from './dashboard/sensor-chart/line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    EventsComponent,
    ConfigurationComponent,
    SensorChartComponent,
    LineChartComponent,
    GaugeChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    NgxChartsModule
  ],
  providers: [FeedService],
 bootstrap: [AppComponent]
})
export class AppModule { }
