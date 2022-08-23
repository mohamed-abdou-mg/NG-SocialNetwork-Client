import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/Account/member.model';
import { MemberService } from 'src/app/_services/Account/member.service';
import { AuthService } from 'src/app/_services/Auth/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @HostListener('window:beforeunload', ['event']) unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  @ViewChild('editForm') editForm: NgForm;
  username: string;
  authUser: Member;

  constructor(private authService: AuthService, private memberService: MemberService, private toastr: ToastrService) { 
    authService.currentUser$.pipe(take(1)).subscribe(user => {
      this.username = user.username
    });
  }

  ngOnInit(): void {
    this.loadAuthUserDetails();
  }

  loadAuthUserDetails(){
    this.memberService.getMember(this.username).subscribe(response => {
      this.authUser = response;
    });
  }

  editFormSubmitted(){
    this.memberService.updateMember(this.authUser).subscribe(() => {
      this.toastr.success("Profile updated successfully");
      this.editForm.reset(this.authUser);
    });
  }

}
