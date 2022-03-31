import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: any;
  username: any;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  getUser() {
    console.log(this.username);
    this.router.navigate(['/user'], { queryParams: { user: this.username } });
  }
}
