import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  // errors: Errors = {errors: {}};
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) // private alertService: AlertService
  {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    //this.isSubmitting = true;
    //this.errors = {errors: {}};

    const credentials = this.form.value;
    console.log(credentials);
    this.userService.login(credentials).subscribe(
      (data) => {
        console.log(data);
        this.router.navigateByUrl('/');
      },
      (err) => {
        console.log(err);
        this.isSubmitting = false;
      }
    );
  }
}
