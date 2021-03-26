import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  isSubmitting: boolean;
  form: FormGroup;
  currentUser: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
      console.log('Current user in the edit profile component');
      console.log(this.currentUser);
    });
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      id: [null, Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      walletAddress: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  update(data) {
    this.isSubmitting = true;
    console.log(data);
    this.userService.update(data.id, data).subscribe(
      (data) => {
        alert('Profile updated succesfully');
        this.router.navigateByUrl('/profile')
        this.isSubmitting = false;
      },
      (err) => {
        alert('Failed to update profile')
        this.isSubmitting = false;
      }
    );
  }
}
