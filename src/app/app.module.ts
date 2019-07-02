import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule,HttpClient} from '@angular/common/http';
import { HttpModule} from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from './layout/layout.module'
import { PrincipalService } from './shared/services/principal.service';
import { LoggedInGuard } from './loggedIn.guard';
import { PagerService } from './shared/services/pager.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    AngularFontAwesomeModule,
    CKEditorModule
  ],
  providers: [
    PrincipalService,
    LoggedInGuard,
    PagerService
    /*  { provide: LocationStrategy, useClass: HashLocationStrategy } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
