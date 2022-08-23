import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from 'src/app/_models/Account/member.model';
import { Photo } from 'src/app/_models/Photo/photo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MemberService {

  members: Member[] = [];

  baseUrl: string = environment.apiUrl + "Users/";
  
  constructor(private http: HttpClient) { }

  getMembers() {
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl).pipe(
      map(response => {
        this.members = response;
        return this.members;
      })
    );
  }

  getMember(username: string) {
    const member = this.members.find(m => m.username == username);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + username);
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + "UpdateUser", member).pipe(
      map(response => {
        var indexOfMember = this.members.indexOf(member);
        this.members[indexOfMember] = member;
      })
    );
  }
 
  setMainPhoto(photo: Photo){
    return this.http.post(this.baseUrl + "SetMainPhoto/" + photo.id, {});
  }

  deletePhoto(photo: Photo){
    return this.http.delete(this.baseUrl + "DeletePhoto/" + photo.id);
  }
  
}