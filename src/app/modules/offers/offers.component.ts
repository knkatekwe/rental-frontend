import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/core/models/offer';
import { User } from 'src/app/core/models/user';
import { OfferService } from 'src/app/core/services/offer.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  isSubmitting: boolean
  currentUser: User;

  offers: Offer[]

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private offerService: OfferService) { }

  ngOnInit() {
    this.isSubmitting = false;
    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
      console.log('current user in the offer home screen');
      console.log(this.currentUser);
      

      setTimeout(()=>{
        this.offerService.getAllUserOffers(this.currentUser.id).subscribe((data)=>{
          this.offers = data
        })
      }, 1000)
    });

  }

  cancel(id) {
    this.isSubmitting = true;
    this.offerService.cancelOffer(id).subscribe(
      (data) => {
        alert('Offer has been cancelled :)');
        // this.router.navigateByUrl('/my/offers')
        this.isSubmitting = true;
      },
      (err) => {
        alert('Failed to cancel offer');
        this.isSubmitting = false;
      }
    );
  }

}
