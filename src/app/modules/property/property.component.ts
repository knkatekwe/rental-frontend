import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/core/models/property';
import { User } from 'src/app/core/models/user';
import { RentalService } from 'src/app/core/services/rental.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  p:any;

  currentUser: User;

  properties: Property[]

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private rentalService: RentalService) { }

  ngOnInit() {

    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
      console.log('current user in the rental home screen');
      console.log(this.currentUser);
      setTimeout(()=>{
        this.rentalService.getAllUserProperites(this.currentUser.id).subscribe((data)=>{
          this.properties = data
        })
      }, 1000)
    });

  }
}
