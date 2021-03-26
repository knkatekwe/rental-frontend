import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ApiService } from './core/services/api.service';
import { JwtService } from './core/services/jwt.service';
import { ShowAuthedDirective } from './core/services/show-authed.directive';
import { UserService } from './core/services/user.service';
import { HttpTokenInterceptor } from './core/_helpers/http.token.interceptor';
import { UserResolver } from './modules/profile/user-resolver.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { RentalService } from './core/services/rental.service';
import { MainComponent } from './modules/main/main.component';
import { PropertyComponent } from './modules/property/property.component';
import { CreatePropertyComponent } from './modules/property/create-property/create-property.component';
import { OfferPropertyComponent } from './modules/property/offer-property/offer-property.component';
import { AuthComponent } from './modules/auth/auth.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { EditProfileComponent } from './modules/profile/edit-profile/edit-profile.component';
import { EditPropertyComponent } from './modules/property/edit-property/edit-property.component';
import { PlaceOfferComponent } from './modules/offers/place-offer/place-offer.component';
import { RentalResolver } from './modules/property/property-resolver.service';
import { OfferService } from './core/services/offer.service';
import { OffersComponent } from './modules/offers/offers.component';
import { IncomingOffersComponent } from './modules/offers/incoming-offers/incoming-offers.component';
import { AuthGuard } from './core/services/auth-guard.service';
import { IncomingOffersAcceptComponent } from './modules/offers/incoming-offers-accept/incoming-offers-accept.component';
import { OfferResolver } from './modules/offers/offer-resolver.service';
import { RentalAgreementService } from './core/services/rental-agreement.service';
import { OfferContractViewComponent } from './modules/offers/offer-contract-view/offer-contract-view.component';
import { RentalAgreementResolver } from './modules/offers/rental-agreement-resolver.service';
// import { TransferService } from './core/services/transfer.service';
import { TransferComponent } from './modules/transfer/transfer.component';
import { TransferService } from './core/services/transfer.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    PropertyComponent,
    CreatePropertyComponent,
    OfferPropertyComponent,
    OffersComponent,
    ProfileComponent,
    EditProfileComponent,
    EditPropertyComponent,
    PlaceOfferComponent,
    IncomingOffersComponent,
    ShowAuthedDirective,
    IncomingOffersAcceptComponent,
    OfferContractViewComponent,
    TransferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    ///////////////////
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    AuthGuard,
    UserService,
    ApiService,
    UserService,
    JwtService,
    UserResolver,
    RentalResolver,
    OfferResolver,
    RentalAgreementResolver,
    RentalService,
    OfferService,
    RentalAgreementService,
    TransferService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
