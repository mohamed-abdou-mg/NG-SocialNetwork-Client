import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {

  constructor(private http: HttpClient) { }

  validationErrors: string[] = [];
  baseUrl: string = "https://localhost:44388/api/";

  ngOnInit(): void {
  }

  get401Error(){
    this.http.get(this.baseUrl + "Bugs/auth").subscribe(response => {
      console.log(response);
    });
  }

  get404NotFound(){
    this.http.get(this.baseUrl + "Bugs/not-found").subscribe(response => {
      console.log(response);
    });
  }

  get500ServerError(){
    this.http.get(this.baseUrl + "Bugs/server-error").subscribe(response => {
      console.log(response);
    });
  }

  get400BadRequest(){
    this.http.get(this.baseUrl + "Bugs/bad-request").subscribe(response => {
      console.log(response);
    });
  }

  get400ValidationError(){
    this.http.post(this.baseUrl + "Accounts/Register", {}).subscribe(response => {
      console.log(response);
    }, error => {
      this.validationErrors = error;
    });
  }


}
