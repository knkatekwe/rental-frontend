import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
    loading = false;
    submitted = false;
    isSubmitting = false;
    errors: Error;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        // private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            walletAddress: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
      //this.isSubmitting = true;
      //this.errors = {errors: {}};

      const registrationData = this.form.value;
      console.log(registrationData)
      this.userService
      .register(registrationData)
      .subscribe(
        data => this.router.navigateByUrl('/login'),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
    }

}
