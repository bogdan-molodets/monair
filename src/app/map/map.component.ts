import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

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
    this.map = this.mapService.getMap('map',35.045556,48.461463,9).addControl(new mapboxgl.NavigationControl(),'top-left');
  }

}
