import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: any;
  isLoggedIn: boolean;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userService.populate();
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
     this.userService.isAuthenticated.pipe(take(1)).subscribe((data)=>{
      this.isLoggedIn = data
    })
  }

  logout() {
    this.userService.purgeAuth(),
    this.router.navigateByUrl('/')
    console.log('logged out successfully!')
  }
}
