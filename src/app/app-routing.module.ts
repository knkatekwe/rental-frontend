import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/services/auth-guard.service';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { MainComponent } from './modules/main/main.component';
import { IncomingOffersAcceptComponent } from './modules/offers/incoming-offers-accept/incoming-offers-accept.component';
import { IncomingOffersComponent } from './modules/offers/incoming-offers/incoming-offers.component';
import { OfferContractViewComponent } from './modules/offers/offer-contract-view/offer-contract-view.component';
import { OfferResolver } from './modules/offers/offer-resolver.service';
import { OffersComponent } from './modules/offers/offers.component';
import { PlaceOfferComponent } from './modules/offers/place-offer/place-offer.component';
import { RentalAgreementResolver } from './modules/offers/rental-agreement-resolver.service';
import { EditProfileComponent } from './modules/profile/edit-profile/edit-profile.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { CreatePropertyComponent } from './modules/property/create-property/create-property.component';
import { RentalResolver } from './modules/property/property-resolver.service';
import { PropertyComponent } from './modules/property/property.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'properties',
    component: PropertyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'properties/add',
    component: CreatePropertyComponent,
    canActivate: [AuthGuard],
  },
  { path: 'my/offers', component: OffersComponent, canActivate: [AuthGuard] },
  {
    path: 'incoming/offers',
    component: IncomingOffersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'incoming/offers/:id/accept',
    component: IncomingOffersAcceptComponent,
    resolve: { offer: OfferResolver },
    canActivate: [AuthGuard],
  },
  {
    path: 'offer/:id/contract-draft',
    component: OfferContractViewComponent,
    resolve: { rentalAgreement: RentalAgreementResolver },
    canActivate: [AuthGuard],
  },
  {
    path: 'property/:id/offer',
    component: PlaceOfferComponent,
    resolve: { property: RentalResolver },
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/edit',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/main',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
