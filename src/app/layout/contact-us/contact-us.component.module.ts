import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsService } from './contact-us.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        
    ],
    providers: [
        ContactUsService,
      ],
})
export class ContactUsComponentModule { }
