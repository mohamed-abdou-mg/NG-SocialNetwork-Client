import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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

  @Output() registerModeEmitted = new EventEmitter<boolean>();
  registerForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private authService: AuthService, private router: Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = new FormGroup({
      gender: new FormControl("male"),
      username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      knownAs: new FormControl("", Validators.required),
      dateOfBirth: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      country: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      confirmPassword: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16), this.matchValues('password')])
    });
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value == control.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

  register(){
    this.authService.Register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, errors => {
      this.validationErrors = errors;
    })
  }

  cancelRegister(){
    this.registerModeEmitted.emit(false);
  }

}
