import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import {DdeComponent} from "./dde/dde.component";
import {details} from "./details/details.component";
import { AuthGuardService as AuthGuard} from './auth/auth-gard.service'


const routes: Routes =[
    { path: '', redirectTo: 'simulateur', pathMatch: 'full' , canActivate: [AuthGuard]},
    { path: 'index',                component: ComponentsComponent , canActivate: [AuthGuard]},
    { path: 'nucleoicons',          component: NucleoiconsComponent , canActivate: [AuthGuard]},
    { path: 'examples/landing',     component: LandingComponent , canActivate: [AuthGuard]},
    { path: 'login',       component: LoginComponent},
    { path: 'examples/profile',     component: ProfileComponent, canActivate: [AuthGuard] },
    {path : 'simulateur', component : DdeComponent, canActivate: [AuthGuard]},
    {path : 'details', component : details, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
