import { Component, OnInit } from '@angular/core';
import { SensorService } from '../services/sensor.service';
import { Sensor } from '../models/sensor';
import { Describer } from '../models/describer';
import { ThrowStmt } from '@angular/compiler';

declare const $: any;
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {
  sensors: Promise<any>;
  sensorProperties: Array<any>;
  sensorIds: Promise<any>;
  infoProperties: Array<string> = ['id', 'sensor_id', 'date'];
  excludeProperties: Array<string> = ['id'];
  sortProperties: string = '';
  next: string = null;
  previous: string = null;
  count: number = 0;
  filterParams = {
    sensor_id: null,
    date_after: '',
    date_before: '',
    ordering: ''
  }
  constructor(private sensorService: SensorService) {
    this.sensorProperties = Describer.describeClass(Sensor);
  }

  ngOnInit() {
    let that = this;
    $('.ui.select.dropdown').dropdown({
      onChange(data) {
        that.filterParams.sensor_id = data;
        that.sensors = that.sensorService.getSensorsByFilter(that.filterParams);
        that.getPaginationInfo();
      }
    });
    $('#rangefrom').calendar({
      type: 'datetime',
      ampm: false,
      endCalendar: $('#rangeto'),
      onChange(data) {
        try {
          that.changeDateFormat(data);
          that.filterParams.date_after = that.changeDateFormat(data);
          that.sensors = that.sensorService.getSensorsByFilter(that.filterParams);
          that.getPaginationInfo();
        } catch (err) {

        }
      },
      popupOptions: { position: 'bottom left', hideOnScroll: true }
    });
    $('#rangeto').calendar({
      type: 'datetime',
      ampm: false,
      startCalendar: $('#rangefrom'),
      onChange(data) {
        try {
          that.changeDateFormat(data);
          that.filterParams.date_before = that.changeDateFormat(data);
          that.sensors = that.sensorService.getSensorsByFilter(that.filterParams);
          that.getPaginationInfo();
        } catch (err) {

        }
      },
      popupOptions: { position: 'bottom left', hideOnScroll: true }
    });
    this.sensors = this.sensorService.getSensorsByFilter(this.filterParams);
    this.getPaginationInfo();
    this.sensorIds = this.sensorService.getSensorIds();
  }

  getSensorsPagination(page) {
    this.sensors = this.sensorService.getSensorsByFilter(this.filterParams, page);
    this.getPaginationInfo();
  }

  getPaginationInfo() {
    this.sensors.then(res => {
      this.next = res.next;
      this.previous = res.previous;
      //console.log('Previous ' + this.previous);
      //console.log('Next ' + this.next);
    })
  }

  toggleExcludePropertyLabel(property) {
    if (this.isExcludeProperty(property)) {
      this.excludeProperties.splice(this.excludeProperties.indexOf(property), 1);
    } else {
      this.excludeProperties.push(property);
    }
  }

  isExcludeProperty(property) {
    return this.excludeProperties.includes(property)
  }

  toggleSortedPropertyLabel(property) {
    this.isSortedProperty(property) ? this.filterParams.ordering = '' : this.filterParams.ordering = property;
    this.count = 0;
    this.next = null;
    this.previous = null
    this.sensors = this.sensorService.getSensorsByFilter(this.filterParams);
    this.getPaginationInfo();
  }

  isSortedProperty(property) {
    return this.filterParams.ordering == property
  }

  changeDateFormat(data) {
    let tmp = [data.getUTCFullYear(), data.getMonth() + 1, data.getDate(), data.getHours(), data.getMinutes(), data.getSeconds()];
    tmp = tmp.map((item, index) => {
      if (index != 0) { item = (item < 10) ? `0${item}` : `${item}` }
      return item;
    });
    return [tmp.slice(0, 3).join('-'), tmp.slice(3, tmp.length).join(':')].join(' ')
  }

  dropFilters() {
    this.filterParams.sensor_id = null;
    this.filterParams.date_after = '';
    this.filterParams.date_before = '';
    $('#rangefrom').calendar('clear');
    $('#rangeto').calendar('clear');
    this.sensors = this.sensorService.getSensorsByFilter(this.filterParams);
    this.getPaginationInfo();
  }

}
