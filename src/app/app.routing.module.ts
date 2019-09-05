import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './loggedIn.guard';
import {ResetPasswordComponent} from './shared/reset-password/reset-password.component'

const routes: Routes = [
    {
        path: 'reset-password/:id',
        component:ResetPasswordComponent,
    },
    {
        path: 'layout',
        loadChildren: 'app/layout/layout.module#LayoutModule',
    },
    // {
    //     path: 'admin',
    //     loadChildren: 'app/admin/admin.module#AdminModule',
    // },
   
    {
        path: '',
        redirectTo: 'layout',
        pathMatch: 'full'
    },
    { path: '**', redirectTo: 'not-found' } 
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
