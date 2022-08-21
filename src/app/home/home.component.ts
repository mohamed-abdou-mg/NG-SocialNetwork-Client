import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showRegister(){
    this.registerMode = true;
  }

  registerModeCanceled(event: boolean){
    this.registerMode = event;
  }

}
