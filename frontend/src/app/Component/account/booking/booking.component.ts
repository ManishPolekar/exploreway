import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, doc, deleteDoc } from '@angular/fire/firestore';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  bookings: any[] = []; // Array to store bookings

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    await this.fetchBookings();
  }

  async fetchBookings() {
    try {
      const cabCollection = collection(this.firestore, 'cabBookings');
      const busCollection = collection(this.firestore, 'busBookings');

      const [cabSnapshot, busSnapshot] = await Promise.all([
        getDocs(cabCollection),
        getDocs(busCollection)
      ]);

      this.bookings = [
        ...cabSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'Cab' })),
        ...busSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'Bus' }))
      ];
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  }

  async cancelBooking(bookingId: string, type: string) { // Changed parameter type to string
    try {
      const collectionName = type === 'Cab' ? 'cabBookings' : 'busBookings';

      const bookingRef = doc(this.firestore, collectionName, String(bookingId)); // Already converting to string - OK

       // Get booking data to include in email
       const bookingData = this.bookings.find(b => b.id === bookingId);
       if (!bookingData) {
         alert('Booking not found.');
         return;
       }
 
       // Prepare email template parameters
       const templateParams = {
        vehicleType: type === 'Cab' ? bookingData.vehicleType || '' : bookingData.busType || '',
        pickupDate: type === 'Cab' ? bookingData.pickupDate : bookingData.departureDate,
        returnDate: bookingData.returnDate || '',
        transferType: type === 'Cab' ? bookingData.transferType || '' : '',
        pickupLocation: bookingData.pickupLocation || '',
        dropLocation: bookingData.dropLocation || '',
        amenities: (bookingData.amenities || []).join(', ')
      };

      // Send cancellation email via EmailJS
      emailjs.send(
        'service_8q0d269',    // Replace with your actual EmailJS service ID
        'template_mcp933d',  // Replace with your actual template ID
        templateParams,
        'r7hOzi83m0Y_xqJ_q'  // Replace with your actual public key
      ).then(
        (result: EmailJSResponseStatus) => {
          console.log('Cancellation email sent:', result.text);
          alert('Cancellation email sent successfully!');
        },
        (error) => {
          console.error('Error sending cancellation email:', error);
          alert('Failed to send cancellation email. Please try again.');
        }
      );


      await deleteDoc(bookingRef);

      this.bookings = this.bookings.filter(b => b.id !== bookingId); // Using non-strict equality - OK if booking.id is string

      alert('Booking cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking. Please try again.');
    }
  }
}
 

