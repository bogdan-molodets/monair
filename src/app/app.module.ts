import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapService } from './services/map.service';
import { SensorService } from './services/sensor.service';
import { DataComponent } from './data/data.component';
import { CustomSensorPipe } from './pipes/custom-sensor.pipe'
import { CustomSensorPropertyPipe } from './pipes/custom-sensor-property.pipe'
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DataComponent,
    CustomSensorPipe,
    CustomSensorPropertyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MapService, SensorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
