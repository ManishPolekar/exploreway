import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintService {
  private emissionFactors: { [key: string]: number } = {
    car_petrol: 0.12,
    car_diesel: 2.68,
    car_hybrid: 1.2,
    car_electric: 0.05,
    bus: 2.5,
    bike: 0.5,
    walk: 0,
  };

  private costPerKm: { [key: string]: number } = {
    car_petrol: 5,
    car_diesel: 8,
    car_hybrid: 3.8,
    car_electric: 1.7,
    bus: 5,
    bike: 2,
    walk: 0,
  };

  constructor() { }

  calculateCarbonFootprint(mode: string, distance: number): number {
    const factor = this.emissionFactors[mode] || 0;
    return + (distance * factor).toFixed(2);
  }
  calculateTravelCost(mode: string, distance: number): number {
    const cost = this.costPerKm[mode] || 0;
    return + (distance * cost).toFixed(2);
  };
}
