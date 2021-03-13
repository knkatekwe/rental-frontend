import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RentalService } from 'src/app/core/services/rental.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  form: FormGroup
  rentals: any;
  currentUser: any;
  isLoggedIn: boolean;
  isOwner: boolean;
  show: boolean;

  constructor(
    private rentalService: RentalService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.show = false;

    this.rentalService.getAllRental().subscribe((result) => {
      this.rentals = result;
      console.log(this.rentals);
    });

    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
      console.log('current user in the rental home screen');
      console.log(this.currentUser);

      if (this.currentUser.id == null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    });
  }

  initForm(){
    this.form = this.fb.group({
      rental: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  showInterest(id) {
    console.log(this.form.value);
    this.rentalService.request(id, this.form.value).subscribe((res) => {
      console.log(res);
      this.show = true;
      this.rentalService
        .updateRental(id, { isActive: false })
        .subscribe((res) => {
          console.log(res);
        });
    });
  }

  images: any = [
    {
      url:
        'https://cdn.pixabay.com/photo/2016/06/24/10/47/architecture-1477041__340.jpg',
    },
    {
      url:
        'https://cdn.pixabay.com/photo/2013/10/09/02/27/boat-house-192990__340.jpg',
    },
    {
      url:
        'https://pixabay.com/photos/architecture-family-house-front-yard-1836070/',
    },
    {
      url:
        'https://cdn.pixabay.com/photo/2017/01/09/00/49/winter-1964361__340.jpg',
    },
    {
      url:
        'https://cdn.pixabay.com/photo/2014/11/21/17/17/country-house-540796__340.jpg',
    },
    {
      url:
        'https://pixabay.com/photos/architecture-bridge-building-travel-3121009/',
    },
    {
      url: 'https://pixabay.com/photos/church-ancient-landscape-2464899/',
    },
  ];
}
