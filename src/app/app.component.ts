import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SocialNetworkClient';
  users: any;
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit():void {
    this.setCurrentUser();
  }

  getUsers(){
    this.http.get('https://localhost:44388/api/Users').subscribe(response => {
      this.users = response;
    })
  }

  setCurrentUser(){
    var user = JSON.parse(localStorage.getItem('user'));
    this.authService.setCurrentUser(user);
  }
}
