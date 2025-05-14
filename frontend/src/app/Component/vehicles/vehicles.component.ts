import { Component, OnInit } from '@angular/core';

type VehicleCategory = 'vehicles';

@Component({
  selector: 'app-vehicles',
  standalone: false,
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {
  categories: VehicleCategory[] = ['vehicles'];

  vehicles: Record<VehicleCategory, {
    name: string;

    sliderImages?: string[];
    currentIndex?: number;
    pricing: { label: string; amount: string }[];
    note: string;
    seatingCapacity?: string;
    sleeperCapacity?: string;
    luggageCapacity?: string;
    engineType?: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'Petrol + CNG' | 'Petrol/Hybrid';
    transmission?: 'Automatic' | 'Manual' | 'Automatic/Manual';

  }[]> = {
    vehicles: [
      {
        name: 'Ertiga(MPV)',
        sliderImages:[ 
          '../../../assets/ertiga.jpg',
          '../../../assets/ertigainterior.jpg',
        ],
        currentIndex: 0,
        pricing: [
          { label: 'Transfer From Airport (Arrival/Departure)', amount: '₹1000-2800' },
          { label: 'Point-to-Point Transfer', amount: '₹25/km' },
          { label: 'Per Day', amount: '₹1500-₹7000' },
        ],
        note: '$10 Surcharge for Transfer trips from 11:30pm',
        seatingCapacity: '6/7 Seater',
        luggageCapacity: '3 Medium Size & 2 Small Size',
        engineType: 'Petrol + CNG',
        transmission: 'Manual',
      },
      {
        name: 'Hycross(MPV)',
        sliderImages:[ 
          '../../../assets/Hycross.jpg',
          '../../../assets/HycossINT.jpg',
        ],
        currentIndex: 0,
        pricing: [
          { label: 'Transfer From Airport (Arrival/Departure)', amount: '₹1000-₹2800' },
          { label: 'Point-to-Point Transfer', amount: '₹25/km' },
          { label: 'Per Day', amount: '₹1500-₹7000' },
        ],
        note: '$10 Surcharge for Transfer trips from 11:30pm',
        seatingCapacity: '7/8 Seater',
        luggageCapacity: '3 Medium Size & 2 Small Size ',
        engineType: 'Petrol/Hybrid',
        transmission: 'Automatic/Manual',
      },
      {
        name: 'Creta(SUV)',
        sliderImages:[ 
          '../../../assets/creta.jpg',
          '../../../assets/CretaInt.jpg',],
        currentIndex: 0,
        pricing: [
          { label: 'Transfer From Airport (Arrival/Departure)', amount: '₹700-₹1200' },
          { label: 'Point-to-Point Transfer', amount: '₹25/km' },
          { label: 'Per Day', amount: '₹1200-₹6500' },
        ],
        note: '$10 Surcharge for Transfer trips from 11:30pm',
        seatingCapacity: '5 Seater',
        luggageCapacity: '2 Medium Size & 1 Small Size',
        engineType: 'Diesel',
        transmission: 'Automatic/Manual',
      },
      {
        name: 'Nexon(EV)',
        sliderImages: [
          '../../../assets/tatanexonev.jpg',
          '../../../assets/NexonInt.jpg',
        ],
        currentIndex: 0,
        pricing: [
          { label: 'Transfer From Airport (Arrival/Departure)', amount: '₹500-₹1000' },
          { label: 'Point-to-Point Transfer', amount: '₹20/km' },
          { label: 'Per Day', amount: '₹2500-₹5000' },
        ],
        note: '$10 Surcharge for Transfer trips from 11:30pm',
        seatingCapacity: '5 Seater',
        luggageCapacity: '2 Medium Size & 1 Small Size',
        engineType: 'Electric',
        transmission: 'Automatic',
      },
      {
        name: 'Swift Dezire',
        sliderImages:[ 
          '../../../assets/Swift_Dezire.jpg',
          '../../../assets/Dezire.jpg',
        ],
        currentIndex: 0,
        pricing: [
          { label: 'Transfer From Airport (Arrival/Departure)', amount: '₹1000-₹1500' },
          { label: 'Point-to-Point Transfer', amount: '₹23/km' },
          { label: 'Per Day', amount: '₹1800-₹3500' },
        ],
        note: '$10 Surcharge for Transfer trips from 11:30pm',
        seatingCapacity: '5 Seater',
        luggageCapacity: '2 Medium Size & 1 Small Size',
        engineType: 'Diesel',
        transmission: 'Manual',
      },
      {
        name: 'Honda City',
        sliderImages: [
          '../../../assets/hondacity.jpg',
          '../../../assets/HondaInt.jpg',
        
        ],
        currentIndex: 0,
        pricing: [
          { label: 'Transfer From Airport (Arrival/Departure)', amount: '₹1500-₹2700' },
          { label: 'Point-to-Point Transfer', amount: '₹23/km' },
          { label: 'Per Day', amount: '₹1800-₹5000' },
        ],
        note: '$10 Surcharge for Transfer trips from 11:30pm',
        seatingCapacity: '5 Seater',
        luggageCapacity: '2 Medium Size & 1 Small Size',
        engineType: 'Petrol',
        transmission: 'Automatic/Manual',
      },
      {
        name: 'Tigor(EV)',
        sliderImages: [
          '../../../assets/tigorev.jpg',
          '../../../assets/tigorevInt.jpg',
        ],
        currentIndex: 0,
        pricing: [
          { label: 'Transfer From Airport (Arrival/Departure)', amount: '₹1200-₹1800' },
          { label: 'Point-to-Point Transfer', amount: '₹20/km' },
          { label: 'Per Day', amount: '₹1700-₹3500' },
        ],
        note: '$10 Surcharge for Transfer trips from 11:30pm',
        seatingCapacity: '5 Seater',
        luggageCapacity: '2 Medium Size & 1 Small Size',
        engineType: 'Electric',
        transmission: 'Automatic',
      },
      //BUSES
      {
        name: 'Force Urbania Mini-Bus',
        sliderImages:[
           '../../../assets/Forceurbania.jpg',
            '../../../assets/urbaniaInt.jpg',

        ],
        currentIndex: 0,
        pricing: [
          { label: 'Transfer From Airport (Arrival/Departure)', amount: '₹2500-₹7000' },
          { label: 'Point-to-Point Transfer(AC)', amount: '₹25-₹30/km' },
          { label: 'Point-to-Point Transfer(Non-AC)', amount: '₹20-₹26/km' },
          { label: 'Per Day(Local)', amount: '₹6000-₹9000' },
          { label: 'Per Day(Outstation)', amount: '₹10000-₹15000' }
        ],
        note: 'Mini Bus is avalaible for 10-17 Seater, so price may vary',
        seatingCapacity: '10/17 Seater',
        luggageCapacity: '10 Medium Size & 2 Small Size',
        engineType: 'Diesel',
        transmission: 'Manual',
      },
      {
        name: 'Volvo 9400B11R Coach Bus',
        sliderImages:[ '../../../assets/Volvo9400b11r.jpg',
          '../../../assets/Volvob11rINT.jpg',
        ],
        currentIndex: 0,
        pricing: [
          { label: 'Transfer From Airport (Arrival/Departure)', amount: '₹5000-₹8500+' },
          { label: 'Point-to-Point Transfer(AC)', amount: '₹30-₹34/km' },
          { label: 'Point-to-Point Transfer(Non-AC)', amount: '₹37-₹45/km' },
          { label: 'Per Day(Local)', amount: '₹8500-₹12000' },
          { label: 'Per Day(Outstation)', amount: '₹13000-₹17000' }
        ],
        note: '$10 Surcharge for Transfer trips from 11:30pm',
        seatingCapacity: '45 Seater',
        luggageCapacity: '20 Medium Size & 5 Small Size',
        engineType: 'Diesel',
        transmission: 'Automatic',
      },
      {
        name: 'Mercedes Benz Tourider ',
        sliderImages: [
          '../../../assets/MercedesTour.jpg',
          '../../../assets/MercedesBenz.jpg',
        ],

        pricing: [
          { label: 'Transfer From Airport (Arrival/Departure)', amount: '₹4,000- ₹7,000+' }, 
          { label: 'Point-to-Point Transfer(AC)', amount: '₹35 - ₹42/km' }, 
          { label: 'Point-to-Point Transfer(Non-AC)', amount: '₹28 - ₹35/km' }, 
          { label: 'Per Day(Local)', amount: '₹10,000 - ₹13,000 ' }, 
          { label: 'Per Day(Outstation)', amount: '₹15,000 - ₹18,000,' }        
        ],
        note: '$10 Surcharge for Transfer trips from 11:30pm',
        seatingCapacity: '40 Seater',
        luggageCapacity: '20 Medium Size & 5 Small Size',
        engineType: 'Diesel',
        transmission: 'Automatic',
      },
      {
        name: 'Volvo9600 Sleeper Bus',
        sliderImages:[ 
          '../../../assets/Volvo9600.jpg',
          '../../../assets/Volvo9600Int.jpg',
        ],
        currentIndex: 0,
        pricing: [
          { label: 'Transfer From Airport (Arrival/Departure)', amount: '₹6,000 – ₹8,000' }, 
          { label: 'Point-to-Point Transfer(AC)', amount: '₹40 - ₹48/km' }, 
          { label: 'Point-to-Point Transfer(Non-AC)', amount: '₹32 - ₹40/km' }, 
          { label: 'Per Day(Local)', amount: '₹12,000 - ₹15,000' }, 
          { label: 'Per Day(Outstation)', amount: '₹17,000 - ₹20,000' } 
        ],
        note: '$10 Surcharge for Transfer trips from 11:30pm',
        sleeperCapacity: '40 Berth',
        luggageCapacity: '20 Medium Size & 5 Small Size',
        engineType: 'Diesel',
        transmission: 'Automatic',
      },
      {
        name: 'JBM Luxuary EV',
        sliderImages: [
          '../../../assets/JBMLUXEV.jpg',
          '../../../assets/JBMevINT.jpg',
        ],
        currentIndex: 0,
        pricing: [
          { label: 'Transfer From Airport (Arrival/Departure)', amount: '₹6,500 - ₹8,000' }, 
          { label: 'Point-to-Point Transfer(AC)', amount: '₹38 - ₹44/km' }, 
          { label: 'Point-to-Point Transfer(Non-AC)', amount: '₹34 - ₹40/km' }, 
          { label: 'Per Day(Local)', amount: '₹11,000 - ₹14,000' }, 
          { label: 'Per Day(Outstation)', amount: '₹15,000 - ₹20,000' }, 
        ],
        note: '$10 Surcharge for Transfer trips from 11:30pm',
        seatingCapacity: '45 Seater',
        luggageCapacity: '20 Medium Size & 5 Small Size',
        engineType: 'Electric',
        transmission: 'Automatic',
      },
    ]
  };
  // Method to go to the previous slide
  prevSlide(vehicle: any) {
    // Ensure currentIndex is not undefined and is within bounds
    const currentIndex = vehicle.currentIndex ?? 0; // Default to 0 if undefined
    if (vehicle.sliderImages?.length) {
      vehicle.currentIndex = (currentIndex - 1 + vehicle.sliderImages.length) % vehicle.sliderImages.length;
    }
  }

  // Next Slide Method
  nextSlide(vehicle: any) {
    // Ensure currentIndex is not undefined and is within bounds
    const currentIndex = vehicle.currentIndex ?? 0; // Default to 0 if undefined
    if (vehicle.sliderImages?.length) {
      vehicle.currentIndex = (currentIndex + 1) % vehicle.sliderImages.length;
    }
  }
}
