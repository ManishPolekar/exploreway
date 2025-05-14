import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { FooterComponent } from './Component/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';  // For Mat Button
import { MatMenuModule } from '@angular/material/menu';
import { ChatbotComponent } from './Component/chatbot/chatbot.component';  // For Mat Menu
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './Component/home/home.component';
import { ContactUsComponent } from './Component/contact-us/contact-us.component';
import { AboutUsComponent } from './Component/about-us/about-us.component';
import { ServicesComponent } from './Component/services/services.component';
import { VehiclesComponent } from './Component/vehicles/vehicles.component';
import { CarbonCalculatorComponent } from './Component/carbon-calculator/carbon-calculator.component';
import { BookOnlineComponent } from './Component/book-online/book-online.component';
import { BlogComponent } from './Component/blog/blog.component';
import { AccountComponent } from './Component/account/account.component';
import { BookingComponent } from './Component/account/booking/booking.component';
import { LoginComponent } from './Component/account/login/login.component';
import { ReviewComponent } from './Component/account/review/review.component';
import { TopbarComponent } from './Component/account/topbar/topbar.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from '../environment/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ChatbotComponent,
    HomeComponent,
    ContactUsComponent,
    AboutUsComponent,
    ServicesComponent,
    VehiclesComponent,
    CarbonCalculatorComponent,
    BookOnlineComponent,
    BlogComponent,
    AccountComponent,
    BookingComponent,
    LoginComponent,
    ReviewComponent,
    TopbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatInputModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTabsModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatCardModule,
    
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()), // ✅ Add this line
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
