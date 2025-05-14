import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { AboutUsComponent } from './Component/about-us/about-us.component';
import { ContactUsComponent } from './Component/contact-us/contact-us.component';
import { ServicesComponent } from './Component/services/services.component';
import { VehiclesComponent } from './Component/vehicles/vehicles.component';
import { CarbonCalculatorComponent } from './Component/carbon-calculator/carbon-calculator.component';
import { BookOnlineComponent } from './Component/book-online/book-online.component';
import { BlogComponent } from './Component/blog/blog.component';
import { AccountComponent } from './Component/account/account.component';
import { LoginComponent } from './Component/account/login/login.component';
import { BookingComponent } from './Component/account/booking/booking.component';
import { ReviewComponent } from './Component/account/review/review.component';
import { TopbarComponent } from './Component/account/topbar/topbar.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path:'vehicles', component: VehiclesComponent },
  { path: 'carbon-calculator', component: CarbonCalculatorComponent },
  { path: 'book-online', component: BookOnlineComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'topbar', component: TopbarComponent},
  {
    path: 'account', component: AccountComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'review', component: ReviewComponent },
      { path: 'booking', component: BookingComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
