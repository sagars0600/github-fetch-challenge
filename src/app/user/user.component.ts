import { GithubService } from './../github.service';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  page: number = 1;
  totalRecords: Number | undefined;
  searchtext: any;
  data: any;
  test = false;
  userRepo: any = {};
  repos: any = [];
  p: number = 1;
  total:any;
  constructor(
    private githubService: GithubService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  click() {
    this.githubService.getUser(this.searchtext).subscribe((res) => {
      this.data = res;
      this.test = true;
      this.total = this.data.length
      this.messageService.add({
        key: 'myKey1',
        severity: 'success',
        summary: 'User Find',
        detail: 'User ' + this.searchtext,
      });
      this.ngxService.startLoader('loader-01');
      setTimeout(() => {
        this.ngxService.stopLoader('loader-01');
      }, 1000);
      this.githubService.getRepo(this.searchtext).subscribe((res) => {
        this.repos = res;
      });
    },err =>{
      this.messageService.add({
        key: 'myKey2',
        severity: 'error',
        summary: 'User Cannot Find',
        detail: 'User ' + this.searchtext,
      });
    });
    this.messageService.clear('myKey1');
    this.messageService.clear('myKey2');
  }

  papaginate(event: any) {}
}
