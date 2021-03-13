import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/core/models/offer';
import { User } from 'src/app/core/models/user';
import { OfferService } from 'src/app/core/services/offer.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-incoming-offers',
  templateUrl: './incoming-offers.component.html',
  styleUrls: ['./incoming-offers.component.css'],
})
export class IncomingOffersComponent implements OnInit {
  isSubmitting: boolean;
  currentUser: User;

  offers: Offer[];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private offerService: OfferService
  ) {}

  ngOnInit() {
    this.isSubmitting = false;
    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
      console.log('current user in the offer home screen');
      console.log(this.currentUser);
      setTimeout(() => {
        this.offerService
          .getAllIncomingOffers(this.currentUser.id)
          .subscribe((data) => {
            this.offers = data;
          });
      }, 1000);
    });
  }

  reject(id) {
    this.isSubmitting = true;
    this.offerService.rejectOffer(id).subscribe(
      (data) => {
        alert('Offer has been rejected :)');
        // this.router.navigateByUrl('/my/offers')
        this.isSubmitting = true;
      },
      (err) => {
        alert('Failed to reject offer');
        this.isSubmitting = false;
      }
    );
  }
}
