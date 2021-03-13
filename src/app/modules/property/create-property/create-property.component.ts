import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { RentalService } from 'src/app/core/services/rental.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css'],
})
export class CreatePropertyComponent implements OnInit {
  form: FormGroup;
  isSubmitting: boolean;
  currentUser: User;

  constructor(
    private fb: FormBuilder,
    private rentalService: RentalService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isSubmitting = false;
    this.initForm();

    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
      console.log('current user in the rental home screen');
      console.log(this.currentUser);
    });
  }

  initForm() {
    this.form = this.fb.group({
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      suburb: ['', Validators.required],
      province: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      status: ['', Validators.required],
      user: ['', Validators.required],
    });
  }

  save() {
    this.isSubmitting = true;
    this.rentalService.saveRental(this.form.value).subscribe(
      (data) => {
        alert('Property added :)');
        this.router.navigateByUrl('/properties')
        this.isSubmitting = false;
      },
      (err) => {
        alert('Failed to add property)');
        this.isSubmitting = false;
      }
    );
  }
}
