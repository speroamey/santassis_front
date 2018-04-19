import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'home', 
             component:HomeComponent,
         },
         {
            path:'',
            redirectTo:'home'
        }
        ]
    }
];

@NgModule({
    declarations:[
     HomeComponent
    ],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
