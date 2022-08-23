import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from '../_models/Authentication/login.model';
import { AuthResponse } from '../_models/Authentication/Responses/auth-response.model';
import { AuthService } from '../_services/Auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loginModel: LoginModel = new LoginModel();
  authResponse: AuthResponse;

  constructor(public authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {   
  }

  Login(){
    this.authService.Login(this.loginModel).subscribe(response => {
      this.router.navigateByUrl('/members');
    });
  }

  Logout(){
    this.authService.Logout();
    this.router.navigateByUrl('/');
  }
}