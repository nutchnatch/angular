import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserServices } from '../users.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
  users: string[];

  constructor(private userService: UserServices){}
  
  onSetToInactive(id: number) {
    this.userService.setToInactive(id);
  }
  ngOnInit() {
    this.users = this.userService.activeUsers;
  }
}
