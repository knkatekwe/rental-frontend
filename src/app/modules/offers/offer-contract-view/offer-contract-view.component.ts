import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalAgreement } from 'src/app/core/models/rental-agreement';
import { User } from 'src/app/core/models/user';
import { RentalAgreementService } from 'src/app/core/services/rental-agreement.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-offer-contract-view',
  templateUrl: './offer-contract-view.component.html',
  styleUrls: ['./offer-contract-view.component.css'],
})
export class OfferContractViewComponent implements OnInit {

  isSubmitting: boolean;
  rentalAgreement: RentalAgreement;
  form: FormGroup;
  currentUser: User;
  isTenant: boolean;

  constructor(
    private route: ActivatedRoute,
    private rentalAgreementService: RentalAgreementService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isSubmitting = false;
    this.route.data.subscribe((data: { rentalAgreement: RentalAgreement }) => {
      this.rentalAgreement = data.rentalAgreement;
      console.log(this.rentalAgreement);
    });

    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
      console.log(this.currentUser);
    });

    //check is user is tenant
    this.isTenant = (this.currentUser.username == this.rentalAgreement.offer.user.username)
    console.log(this.isTenant)

  }

  cancel(id, oId) {
    this.isSubmitting = true;
    this.rentalAgreementService.cancelRentalAgreement(id, oId).subscribe(
      (data) => {
        alert('Rental Agreement draft cancelled successfully :)');
        this.router.navigateByUrl('/incoming/offers');
        this.isSubmitting = false;
      },
      (err) => {
        alert('Failed to cancel rental agreement draft :(');
        this.isSubmitting = false;
      }
    );
  }

  accept(id) {
    this.isSubmitting = true;
    this.rentalAgreementService.acceptRentalAgreement(id).subscribe(
      (data) => {
        alert('Rental Agreement draft accepted successfully :)');
        this.router.navigateByUrl('/my/offers');
        this.isSubmitting = false;
      },
      (err) => {
        alert('Failed to accept rental agreement draft :(');
        this.isSubmitting = false;
      }
    );
  }

  reject(id) {
    this.isSubmitting = true;
    this.rentalAgreementService.rejectRentalAgreement(id).subscribe(
      (data) => {
        alert('Rental Agreement draft rejected successfully :)');
        this.router.navigateByUrl('/my/offers');
        this.isSubmitting = false;
      },
      (err) => {
        alert('Failed to rejected rental agreement draft :(');
        this.isSubmitting = false;
      }
    );
  }
}
