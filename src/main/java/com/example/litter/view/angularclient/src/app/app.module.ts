import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import {AuthenticationService} from "./services/authentication/authentication.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MDBBootstrapModule, MDBModalRef, ModalModule} from 'angular-bootstrap-md';
import {httpInterceptorProviders} from "./services/authentication/auth-interceptor";
import { TrashComponent } from './trash/trash.component';
import { NewTrashComponent } from './new-trash/new-trash.component';
import { IndividualTrashComponent } from './individual-trash/individual-trash.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    HomeComponent,
    NavBarComponent,
    TrashComponent,
    NewTrashComponent,
    IndividualTrashComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule,
    MDBBootstrapModule.forRoot()
  ],
  entryComponents: [ModalComponent],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
