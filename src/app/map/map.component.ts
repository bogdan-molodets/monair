import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
// import * as turf from "turf";
declare const $: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map;
  constructor(private mapService: MapService) {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {
    this.map = this.mapService.getMap('map', 35.045556, 48.461463, 9).addControl(new mapboxgl.NavigationControl(), 'top-left');
    let coords = [
      { c: [35.045556, 48.46146], color: '#ff0000', opacity: 0.2 },
      { c: [34.911495, 48.476316], color: '#ff0000', opacity: 0.9 },
      { c: [34.996384, 48.424114], color: '#ff0000', opacity: 0.45 },
      { c: [35.124553, 48.485320], color: '#ff0000', opacity: 0.3 },
      { c: [35.015224, 48.519117], color: '#ff0000', opacity: 0.61 },
      { c: [35.064985, 48.428036], color: '#ff0000', opacity: 0.7 },
    ]
    this.mapService.createMarker(48.46146, 35.045556, 1);
    this.mapService.createMarker(48.476316, 34.911495, 2);
    this.mapService.createMarker(48.424114, 34.996384, 3);
    this.mapService.createMarker(48.485320, 35.124553, 4);
    this.mapService.createMarker(48.519117, 35.015224, 5);
    this.mapService.createMarker(48.428036, 35.064985, 6);
    // turf.point()



    let that = this;
    this.mapService.map.on('load', function () {

      for (let index = 0; index < coords.length; index++) {
        let circle = turf.circle(turf.point(coords[index].c), 2);
        that.mapService.addSource('polygon' + index, circle, 'fill', 'showpoly' + index, {
          'fill-color': coords[index].color,
          'fill-opacity': coords[index].opacity
        });
      }


    });
  }

  scrollToTable() {
    $('app-root').animate({
      scrollTop: $("app-data").offset().top
    }, 2000);
  }

}
