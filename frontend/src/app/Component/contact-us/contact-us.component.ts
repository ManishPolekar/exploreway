import { Component, OnInit } from '@angular/core';
import maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-contact-us',
  standalone: false,
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit {
  private map: maplibregl.Map | undefined;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = new maplibregl.Map({
      container: 'map', 
      style: `https://api.maptiler.com/maps/bright-v2/style.json?key=NG53V17o6AOM9yftBmXi`,
      center: [73.8567, 18.5204], 
      zoom: 12
    });
    this.map.addControl(new maplibregl.NavigationControl(), 'top-right');

    new maplibregl.Marker()
      .setLngLat([73.8567, 18.5204]) // Longitude, Latitude of Pune
      .addTo(this.map);
  } 
}
