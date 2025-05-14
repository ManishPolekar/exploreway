import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { CarbonFootprintService } from '../../service/carbon-footprint.service';
@Component({
  selector: 'app-carbon-calculator',
  standalone: false,
  templateUrl: './carbon-calculator.component.html',
  styleUrl: './carbon-calculator.component.css'
})
export class CarbonCalculatorComponent {
  carbonForm: FormGroup;
  carbonFootprint: number | null = null;
  travelCost: number | null = null;
  ecoOptions: string[] = [];

  
  constructor ( private fb: FormBuilder, private carbonFootprintService: CarbonFootprintService) {
    this.carbonForm = this.fb.group({
      mode: [''],
      distance: [''],
    })
  }

  calculate() {
    const { mode, distance } = this.carbonForm.value;
    this.carbonFootprint = this.carbonFootprintService.calculateCarbonFootprint(mode, Number(distance));
    this.travelCost = this.carbonFootprintService.calculateTravelCost(mode, Number(distance));
    this.getEcoFriendlyOptions(mode);
  }

  getEcoFriendlyOptions(selectedMode: string) {
    const ecoFriendlyModes = ['bike', 'walk', 'bus', 'train'];
    this.ecoOptions = ecoFriendlyModes.filter(mode => mode !== selectedMode);
  }

}
