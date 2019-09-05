import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestifyComponent} from './testify.component'

const routes: Routes = [
    {
        path: '',
        component:TestifyComponent
    },
   

    { path: '**', redirectTo: 'not-found' } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
