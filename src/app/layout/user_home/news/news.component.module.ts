import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RouterModule } from '@angular/router';

import { NewsService } from './news.service';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NewsComponent } from './news.component';
import { AddNewsComponent } from './news.add.component';
import { ViewNewsComponent } from './news.view.component';

@NgModule({
    imports: [
        CommonModule,
        CKEditorModule,
        FormsModule,
        NgxPaginationModule,
        RouterModule
    ],
    declarations: [
        NewsComponent,
        AddNewsComponent,
        ViewNewsComponent
    ],
    providers: [
        NewsService,
        /*  { provide: LocationStrategy, useClass: HashLocationStrategy } */
      ],
})
export class NewsComponentModule { }
