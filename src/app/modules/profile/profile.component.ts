import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
      console.log('current user in the rental home screen');
      console.log(this.currentUser);
    });

  }

}
