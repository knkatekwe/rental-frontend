import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/core/models/property';
import { User } from 'src/app/core/models/user';
import { RentalService } from 'src/app/core/services/rental.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css'],
})
export class EditPropertyComponent implements OnInit {
  
  form: FormGroup;
  isSubmitting: boolean;
  property: Property;
  currentUser: User;

  constructor(
    private fb: FormBuilder,
    private rentalService: RentalService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSubmitting = false;
    this.initForm();

    this.route.data.subscribe((data: { property: Property }) => {
      this.property = data.property;
      console.log(this.property);
    });

    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
      console.log('Current user in edit property');
      console.log(this.currentUser);
    });
  }

  initForm() {
    this.form = this.fb.group({
      id: [null, Validators.required],
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

  save(data) {
    this.isSubmitting = true;
    this.rentalService.updateRental(data.id, data).subscribe(
      (data) => {
        alert('Property edited :)');
        this.router.navigateByUrl('/properties');
        this.isSubmitting = false;
      },
      (err) => {
        alert('Failed to edited property)');
        this.isSubmitting = false;
      }
    );
  }
}
