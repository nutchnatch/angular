import { Component, OnInit } from '@angular/core';
import { UserServices } from '../users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit{
  users: string[];

  constructor(private userService: UserServices){}
  
  onSetToActive(id: number) {
    this.userService.setToActive(id);
  }

  ngOnInit() {
    this.users = this.userService.inactiveUsers;
  }
}
