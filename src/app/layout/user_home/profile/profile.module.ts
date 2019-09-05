import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserProfileComponent } from './profile.component';
import { UserProfileService } from './profile.service';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {EqualValidator} from './custom-password-validation.directive'
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxPaginationModule,
        ImageCropperModule
    ],
    declarations: [
        UserProfileComponent,
        EqualValidator
    ],
    providers: [
        UserProfileService,
        /*  { provide: LocationStrategy, useClass: HashLocationStrategy } */
    ],
})
export class UserProfileModule { }
