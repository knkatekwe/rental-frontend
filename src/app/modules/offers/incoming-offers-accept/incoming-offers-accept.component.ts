import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from 'src/app/core/models/offer';
import { RentalAgreement } from 'src/app/core/models/rental-agreement';
import { User } from 'src/app/core/models/user';
import { RentalAgreementService } from 'src/app/core/services/rental-agreement.service';
import { TransferService } from 'src/app/core/services/transfer.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-incoming-offers-accept',
  templateUrl: './incoming-offers-accept.component.html',
  styleUrls: ['./incoming-offers-accept.component.css']
})
export class IncomingOffersAcceptComponent implements OnInit {

  isSubmitting: boolean;
  offer: Offer;
  form: FormGroup;
  currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private rentalAgreementService: RentalAgreementService,
    private transferService: TransferService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isSubmitting = false;
    this.route.data.subscribe((data: { offer: Offer }) => {
      this.offer = data.offer;
      console.log(this.offer);
    });
    this.initForm();

    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
      console.log(this.currentUser);
    });
  }

  initForm() {
    this.form = this.fb.group({
      amount: ['', Validators.required],
      leasePeriod: ['', Validators.required],
      leaseStart: ['', Validators.required],
      tenantWalletAddress: ['', Validators.required],
      contractBlockAddress: ['', Validators.required],
      terms: ['', Validators.required],
      offer: ['', Validators.required]
    });
  }

  createLease() {
    this.transferService
      .createLease(this.form.value)
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });
  }

  save() {
    this.isSubmitting = true;
    this.rentalAgreementService.saveRentalAgreement(this.form.value).subscribe(
      (data) => {
        alert('Rental Agreement draft created successfully :)');
        this.router.navigateByUrl('/incoming/offers')
        this.isSubmitting = false;
        this.createLease()
      },
      (err) => {
        alert('Failed to create rental agreement draft :(');
        this.isSubmitting = false;
      }
    );
  }

}
