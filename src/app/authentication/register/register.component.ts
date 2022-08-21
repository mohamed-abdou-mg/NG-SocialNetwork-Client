import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { concat } from 'rxjs';
import { RegisterModel } from 'src/app/_models/Authentication/register.model';
import { AuthService } from 'src/app/_services/Auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerModel: RegisterModel = new RegisterModel();
  @Output() registerModeEmitted = new EventEmitter<boolean>();

  constructor(private authService: AuthService, private router: Router, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this.authService.Register(this.registerModel).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => {
      this.toastr.error(error.error);
      this.router.navigateByUrl('/');
    })
  }

  cancelRegister(){
    this.registerModeEmitted.emit(false);
  }

}
