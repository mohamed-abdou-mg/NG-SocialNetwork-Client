import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/Account/member.model';
import { AuthResponse } from 'src/app/_models/Authentication/Responses/auth-response.model';
import { Photo } from 'src/app/_models/Photo/photo.model';
import { MemberService } from 'src/app/_services/Account/member.service';
import { AuthService } from 'src/app/_services/Auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  uploader:FileUploader;
  hasBaseDropZoneOver:boolean = false;
  baseUrl = environment.apiUrl;
  authUser: AuthResponse;
  @Input() member: Member;

  constructor(private authService: AuthService, private memberService: MemberService, private toastr: ToastrService) { 
    authService.currentUser$.pipe(take(1)).subscribe(response => {
      this.authUser = response;
    })
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + "Users/AddPhoto",
      authToken: "Bearer " + this.authUser.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
      }
    }
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  SetMainPhoto(photo: Photo){
    this.memberService.setMainPhoto(photo).subscribe(() => {
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(element => {
        if(element.isMain) element.isMain = false;
        if(element.id == photo.id) element.isMain = true;
      });
      this.toastr.success("Main photo sets successfully");
    })    
  }

  DeletePhoto(photo: Photo){
    this.memberService.deletePhoto(photo).subscribe(() => {
      this.member.photos = this.member.photos.filter(p => p.id != photo.id);
      this.toastr.success("Photo deleted successfully");
    })    
  }

}
