import { Component } from '@angular/core';
import { UserServices } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserServices ]
})
export class AppComponent {}
