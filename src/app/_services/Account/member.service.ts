import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Member } from 'src/app/_models/Account/member.model';
import { FilterParams } from 'src/app/_models/Filter/filterParams.mode';
import { PaginatedResult } from 'src/app/_models/Pagination/paginatedResult.model';
import { Photo } from 'src/app/_models/Photo/photo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MemberService {

  members: Member[] = [];
  membersCahe = new Map();

  baseUrl: string = environment.apiUrl + "Users/";

  constructor(private http: HttpClient) { }

  getMembers(filterParams: FilterParams) {
    
    var response = this.membersCahe.get(Object.values(filterParams).join('-'));
    if(response){
      return of(response);
    }

    console.log(response);

    let params = this.setPaginationHeaders(filterParams);
    return this.getPaginatedResult<Member[]>(this.baseUrl + "GetUsers" ,params).pipe(
      map(response => {
        this.membersCahe.set(Object.values(filterParams).join('-'), response);
        return response;
      })
    );
  }

  getMember(username: string) {
    const member = [...this.membersCahe.values()]
    .reduce((arr, ele) => arr.concat(ele.result), [])
    .find((member: Member) => member.username === username);
    
    if(member) return of(member);

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


  private getPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url , { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  setPaginationHeaders(filterParams: FilterParams){
    let params = new HttpParams();
    params = params.append('pageNumber', filterParams.pageNumber.toString());
    params = params.append('pageSize', filterParams.pageSize.toString());
    params = params.append('minAge', filterParams.minAge.toString());
    params = params.append('maxAge', filterParams.maxAge.toString());
    params = params.append('gender', filterParams.gender);
    params = params.append('orderBy', filterParams.orderBy);
    return params;
  }
  
}