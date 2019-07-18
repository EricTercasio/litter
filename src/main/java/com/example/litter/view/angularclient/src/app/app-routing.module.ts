import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterFormComponent} from "./register-form/register-form.component";
import {HomeComponent} from "./home/home.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {IndividualTrashComponent} from "./individual-trash/individual-trash.component";


const routes: Routes = [
    {
        path: 'signup',
        component: RegisterFormComponent
    },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'trash/:trashId',
    component: IndividualTrashComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
