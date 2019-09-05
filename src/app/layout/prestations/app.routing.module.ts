import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrestationsComponent} from './prestations.component'

const routes: Routes = [
    {
        path: '',
        component:PrestationsComponent
    },
   

    { path: '**', redirectTo: 'not-found' } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
