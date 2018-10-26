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
    this.mapService.createMarker(48.46146,35.045556,1);
    let feature = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              35.04037857055664,
              48.46592165804401
            ],
            [
              35.0386619567871,
              48.46347441059377
            ],
            [
              35.043983459472656,
              48.463246753669175
            ],
            [
              35.04406929016113,
              48.46603548063497
            ],
            [
              35.04037857055664,
              48.46592165804401
            ]
          ]
        ]
      }};
      let that = this;
    this.mapService.map.on('load', function(){
      that.mapService.createPolygon(feature, '1f');
    });
  }

}
