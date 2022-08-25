import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/Account/member.model';
import { MemberService } from '../_services/Account/member.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  members: Partial<Member[]>;
  predicate = 'liked'

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.loadLikes();
  }


  loadLikes() {
    this.memberService.getLikes(this.predicate).subscribe(response => {
      this.members = response;
    })
  }

}
