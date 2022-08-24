import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/Account/member.model';
import { AuthResponse } from 'src/app/_models/Authentication/Responses/auth-response.model';
import { FilterParams } from 'src/app/_models/Filter/filterParams.mode';
import { Pagination } from 'src/app/_models/Pagination/pagination.interface';
import { MemberService } from 'src/app/_services/Account/member.service';
import { AuthService } from 'src/app/_services/Auth/auth.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  genderSelect = [{ value : 'male', display : 'Male' }, { value : 'female', display : 'Female' }];
  members: Member[];
  pagination: Pagination;
  filterParams: FilterParams;

  constructor(private memberService: MemberService, private authService: AuthService) { 
    authService.currentUser$.pipe(take(1)).subscribe(response => {
      this.filterParams = new FilterParams(response);
    })
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers(this.filterParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any){
    this.filterParams.pageNumber = event.page;
    this.loadMembers();
  }

  resetFilter(){
    this.authService.currentUser$.pipe(take(1)).subscribe(response => {
      this.filterParams = new FilterParams(response);
    })
  }
}