import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { shareReplay } from 'rxjs';

const CACHE_KEY = 'httpRepoCache';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  data: any = {};
  user: any;
  test = true;
  test1 = false;
  projectDetails: any = [];
  repos: any = [];
  page: number = 1;
  itemsPerPage = 10;
  totalItems: any;
  cachedData: any = {};

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
      this.user = response.user;

      let url = 'https://api.github.com/users/' + response.user;
      this.http.get(url).subscribe(
        (response: any) => {
          this.messageService.add({
            key: 'myKey1',
            severity: 'success',
            summary: 'User Find',
            detail: 'User ' + this.user,
          });
          this.ngxService.startLoader('loader-01');
          setTimeout(() => {
            this.ngxService.stopLoader('loader-01');
          }, 10);

          this.totalItems = response.public_repos;
          this.data = response;
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

  getdetails() {
    if (this.cachedData?.hasOwnProperty(this.page)) {
      this.projectDetails = JSON.parse(this.cachedData[this.page]);
    } else {
      this.http
        .get(
          `https://api.github.com/users/${this.user}/repos?per_page=10&page=${this.page}`
        )
        .subscribe((response: any) => {
          this.projectDetails = response;
          this.cachedData[this.page] = JSON.stringify(response);
          this.test1 = true;
          this.ngxService.startLoader('loader-01');
          setTimeout(() => {
            this.ngxService.stopLoader('loader-01');
          }, 100);
        });
    }
  }
}
