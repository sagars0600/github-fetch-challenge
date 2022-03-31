import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';

const CACHE_KEY = 'httpRepoCache';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  data: any = {};
  user: any;
  test = false;
  test1 = false;

  projectDetails: any = [];
  repos: any = [];

  page: number = 1;
  itemsPerPage = 10;
  totalItems : any;

  accessUser:any;
  constructor(
    private router: ActivatedRoute,
    private http: HttpClient,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUser();

  }
  //get user
  getUser() {
    this.router.queryParams.subscribe((response: any) => {
      console.log(response.user);
      this.user = response.user;
      this.accessUser = localStorage.getItem('1');
      console.log(localStorage.getItem('1'));
      let url = 'https://api.github.com/users/' + response.user;
      this.http.get(url).subscribe(

        (response) => {

          this.ngxService.startLoader('loader-01');
          setTimeout(() => {
            this.ngxService.stopLoader('loader-01');
          }, 10);
          console.log(response);
          this.data = response;
          localStorage.setItem('1',JSON.stringify(response));
          this.test = true;
        },
        (error: any) => {
          this.test = false;

          this.messageService.add({
            key: 'myKey2',
            severity: 'error',
            summary: 'User Cannot Find',
            detail: 'User ' + this.user,
          });
        }
      );
    });
  }

 getdetails(){

    this.http.get(`https://api.github.com/users/${this.user}/repos?page=${1}&per_page=${this.itemsPerPage}`).subscribe((response:any) =>{
      console.log(response);
      this.projectDetails =  response;
      this.totalItems = response.length;
      this.test1 = true;
      this.ngxService.startLoader('loader-01');
      setTimeout(() => {
        this.ngxService.stopLoader('loader-01');
      }, 100);
    })
  }
  gty(page: any){
    this.http.get(`https://api.github.com/users/${this.user}/repos?page=${page}&per_page=${this.itemsPerPage}`).subscribe((response: any) => {
      this.projectDetails =  response;
      this.totalItems = response.length;
      this.test1 = true;
      
    })
  }

}
