import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import maplibregl from 'maplibre-gl';
import { GeocodingControl } from '@maptiler/geocoding-control/maplibregl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Firestore, doc,addDoc ,setDoc, collection } from '@angular/fire/firestore'; // Import 'collection' here
import { ChangeDetectorRef } from '@angular/core';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-book-online',
  standalone: false,
  templateUrl: './book-online.component.html',
  styleUrl: './book-online.component.css'
})
export class BookOnlineComponent implements AfterViewInit {
  distanceForm: FormGroup;
  BusForm: FormGroup;
  selectedAmenities: string[] = [];
  busSelectedAmenities: string[] = [];

  private apiKey: string = 'DPdPKrlbEFrWTZ97H6nN';

  ngAfterViewInit(): void {
    const map = new maplibregl.Map({
      container: 'map', // ID of the HTML element where the map should be rendered
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${this.apiKey}`,
      center: [73.8567, 18.5204], // Default center coordinates
      zoom: 12, // Default zoom level
    });

    // Add Geocoding Control (Autocomplete Search Box)
    const gc = new GeocodingControl({
      apiKey: this.apiKey,
    });

    map.addControl(gc);
  }

  constructor(private fb: FormBuilder, private firestore: Firestore, private cdRef: ChangeDetectorRef) {
    this.distanceForm = this.fb.group({
      vehicleType: ['', Validators.required],
      amenities: [[]],
      pickupDate: ['', Validators.required],
      pickupLocation: ['', Validators.required],
      dropLocation: ['', Validators.required],
      transferType: ['one-way', Validators.required],
      returnDate: [''],  // <-- Add this line to include returnDate in the form
    });

    this.BusForm = this.fb.group({
      busType: ['', Validators.required],
      amenities: [[]], // Ensure amenities are stored as an array
      pickupLocation: ['', Validators.required],
      dropLocation: ['', Validators.required],
      departureDate: ['', Validators.required],
      returnDate: [''],
    });
  }
  onAmenityChange(event: any, amenity: string) {
    if (event.checked) {
      this.selectedAmenities.push(amenity);
    } else {
      const index = this.selectedAmenities.indexOf(amenity);
      if (index >= 0) {
        this.selectedAmenities.splice(index, 1);
      }
    }
    this.distanceForm.get('amenities')?.setValue(this.selectedAmenities);
  }

  onBusAmenityChange(event: any, amenity: string) {
    if (event.checked) {
      this.busSelectedAmenities.push(amenity);
    } else {
      const index = this.busSelectedAmenities.indexOf(amenity);
      if (index >= 0) {
        this.busSelectedAmenities.splice(index, 1);
      }
    }
    this.BusForm.get('amenities')?.setValue(this.busSelectedAmenities);
  }
  async onSubmitDistance() {
    if (this.distanceForm.valid) {
      this.distanceForm.get('amenities')?.setValue(this.selectedAmenities);
        const cabBookingData = {
          type: 'CAB',
          ...this.distanceForm.value,
        };
        try {
          const cabCollectionRef = collection(this.firestore, 'cabBookings');
          const docRef = await addDoc(cabCollectionRef, cabBookingData); // Use addDoc
          alert(`Cab booking submitted successfully with ID: ${docRef.id}`); // Access the auto-generated ID

          const templateParams = {
            vehicleType: cabBookingData.vehicleType,
            pickupDate: cabBookingData.pickupDate,
            returnDate: cabBookingData.returnDate || '',
            transferType: cabBookingData.transferType,
            pickupLocation: cabBookingData.pickupLocation,
            dropLocation: cabBookingData.dropLocation,
            amenities: cabBookingData.amenities.join(', ')
          };            
          await emailjs.send('service_8q0d269', 'template_olr4muh', templateParams, 'r7hOzi83m0Y_xqJ_q');
          alert("Confirmation email sent successfully.");
    
    
          this.distanceForm.reset();
          this.selectedAmenities = [];
          this.cdRef.detectChanges();
        }catch (error) {
          console.error('Error submitting cab booking:', error);
          alert('Failed to submit cab booking. Please try again.');
        }
        }else {
          alert('Please fill all required fields.');
        }
      }
      async onSubmitBus() {
        if (this.BusForm.valid) {
          const formValue = this.BusForm.value;
          const busBookingData = {
            type: 'BUS',
            ...formValue,
            departureDate: this.formatDate(formValue.departureDate),
            returnDate: formValue.returnDate ? this.formatDate(formValue.returnDate) : '',
            amenities: this.busSelectedAmenities
          };
          try {
            const busCollectionRef = collection(this.firestore, 'busBookings');
            const docRef = await addDoc(busCollectionRef, busBookingData); // Use addDoc
            alert(`Bus booking submitted successfully with ID: ${docRef.id}`); // Access the auto-generated ID

            const templateParams = {
              vehicleType: busBookingData.busType, // Mapping busType to vehicleType for consistency
              pickupDate: busBookingData.departureDate,
              returnDate: busBookingData.returnDate || '',
              pickupLocation: busBookingData.pickupLocation,
              dropLocation: busBookingData.dropLocation,
              amenities: busBookingData.amenities.join(', ')
            };            
            await emailjs.send('service_8q0d269', 'template_olr4muh', templateParams, 'r7hOzi83m0Y_xqJ_q');
            alert("Confirmation email sent successfully.");

            this.BusForm.reset();
            this.busSelectedAmenities = [];
          } catch (error) {
            console.error('Error submitting bus booking:', error);
            alert('Failed to submit bus booking. Please try again.');
          }
        } else {
          alert('Please fill all required fields.');
        }
      }
  // Utility to convert Date to YYYY-MM-DD
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }    
}