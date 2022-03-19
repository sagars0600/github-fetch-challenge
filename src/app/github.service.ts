import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getUser(name: any) {
    let url = 'https://api.github.com/users/'+ name;
    return this.http.get(url);
  }

  getRepo(name: any) {
    let url = "https://api.github.com/users/"+name+"/repos";
    console.log(url);
    return this.http.get(url);

  }
}
