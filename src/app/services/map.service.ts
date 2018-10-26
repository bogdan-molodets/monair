import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: any;
  constructor() { }

  getMap(container: string, centerLon: number, centerLat: number, zoom: number): any {
    return this.map = new mapboxgl.Map({
      container: container,
      style: 'mapbox://styles/bogdanmolodets/cjc0iypmd2gcf2rlefqdzoasf',
      center: [centerLon, centerLat],
      zoom: zoom,
      attributionControl: false
    });
  }

  createMarker(lat, lon, id) {
    const el = document.createElement('div');
    el.className = 'marker';
    el.id = id;
    const img = document.createElement('img');
    img.src = `../../assets/marker.png`;
    el.appendChild(img);
    el.style.cursor = 'pointer';
    el.style.width = '16px';
    el.style.height = '16px';
    const that = this;
    el.addEventListener('click', function () {
      that.selectPoint([lon, lat], 16);
    });
    new mapboxgl.Marker(el)
          .setLngLat([lon, lat])
          .addTo(this.map);
  }

  selectPoint(point, zoom) {
    this.map.flyTo({
      center: point,
      zoom: zoom
    });
  }

  createPolygon(feature, id) {
    this.map.addSource(id, {
      type: 'geojson',
      data: feature
    });
    this.map.addLayer({
      id: id,
      type: 'Feature',
      source: id,
    });
  }
}
