import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/core/models/property';
import { User } from 'src/app/core/models/user';
import { OfferService } from 'src/app/core/services/offer.service';
import { RentalService } from 'src/app/core/services/rental.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-place-offer',
  templateUrl: './place-offer.component.html',
  styleUrls: ['./place-offer.component.css'],
})
export class PlaceOfferComponent implements OnInit {
  isSubmitting: boolean;
  property: Property;
  form: FormGroup;
  currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private fb: FormBuilder,
    private rentalService: RentalService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isSubmitting = false;
    this.route.data.subscribe((data: { property: Property }) => {
      this.property = data.property;
      console.log(this.property);
    });
    this.initForm();

    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
      console.log('current user in the rental home screen');
      console.log(this.currentUser);
    });
  }

  initForm() {
    this.form = this.fb.group({
      property: ['', Validators.required],
      user: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  save() {
    this.isSubmitting = true;
    this.offerService.saveOffer(this.form.value).subscribe(
      (data) => {
        alert('Offer placed successfully :)');
        this.router.navigateByUrl('/my/offers')
        this.isSubmitting = false;
      },
      (err) => {
        alert('Failed to add offer :(');
        this.isSubmitting = false;
      }
    );
  }

}
