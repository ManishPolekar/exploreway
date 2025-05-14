import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor() { }

  vehicles = {
    cars: [
      {name: 'Hycross', image: '../../assets/Hycross.jpg'},
      {name: 'Creta', image: '../../assets/creta.jpg'},
      {name: 'City', image: '../../assets/city.jpg'},
      {name: 'Ertiga', image: '../../assets/ertiga.jpg'},
      {name: 'TATA-NEXONEV', image: '../../assets/tataev.jpg'},
      {name: 'Dzire', image: '../../assets/Swift_Dezire.jpg'}
    ],
    buses: [
      {name: 'Tata Magna', image: '../../assets/Tata_magna.jpg'},
      {name: 'Tata EV', image: '../../assets/UltraEV2-0-.jpg'},
      {name: 'Tata EV9', image: '../../assets/ultraev9.jpg'},
      {name: 'Mini-Bus', image: '../../assets/Forceurbania.jpg'},
      {name: 'Luxury Bus', image: '../../assets/45seater.jpg'},
    ]
  }
  getVehicles() {
    return this.vehicles;
  }
}
