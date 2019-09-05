import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserProfileService } from './profile.service'
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IMAGE_HOST, createRequestOption } from '../../../request-util';
import { ImageCroppedEvent } from 'ngx-image-cropper';

declare let SmoothScroll: any;
declare let jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private image_url: string = IMAGE_HOST;
  loading: boolean = false;
  profile: any;
  formData: FormData;
  model: any = {};
  pager_infos: any;
  editField: any;
  sexes: string[];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  tmp_image: string;
  user: any;
  // @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  constructor(private route: ActivatedRoute, private router: Router, private profileService: UserProfileService) {
    this.profile = {};
    this.user = {};
    this.sexes = ['Masculin', 'Feminin'];
    this.tmp_image = 'assets/img/about/1.jpg'
  }


  ngOnInit() {
    SmoothScroll();
    this.getProfile();
  }

  getProfile() {
    this.profileService.getProfile()
      .subscribe(
        (resp) => {
          console.log(resp);
          this.model = resp.data;
        },
        (error) => {
          console.log(error);
          return;
        }
      )
  }

  changeValue(property, ev) {
    //this api call or whatever you need to do on value change
    const editField = ev.target.value;
  }

  updateList(property, ev) {
    this.editField = ev.target.value;
    this.model[property] = ev.target.value;
    console.log(typeof this.model.birthdate);

    this.profileService.updateProfile(this.model)
      .subscribe(
        (resp) => {
          this.model = resp.data;
          console.log(resp);
        },
        (error) => {
          console.log(error);
          return;
        }
      )
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(this.croppedImage);

  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  sendAvatar() {
    this.user.avatar = this.croppedImage;
    this.profileService.updateProfileAvatar(this.user)
      .subscribe(
        (resp) => {
          this.model = resp.data;
          jQuery('#changeAvatar').modal("hide");
        },
        (error) => {
          console.log(error);
          return;
        }
      )
  }

  changePassword() {
    this.user.avatar = this.croppedImage;
    this.profileService.updateProfileAvatar(this.user)
      .subscribe(
        (resp) => {
          this.model = resp.data;
          jQuery('#changeAvatar').modal("hide");
        },
        (error) => {
          console.log(error);
          return;
        }
      )
  }

}
