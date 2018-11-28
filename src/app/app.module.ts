import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DdeComponent } from './dde/dde.component';
import { details } from './details/details.component';
import { StorageServiceModule} from 'angular-webstorage-service';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {AuthGuardService} from './auth/auth-gard.service';
import {AuthService} from './auth/auth.service';
registerLocaleData(localeFr, 'fr');

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        DdeComponent,
        details
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        HttpClientModule,
        FormsModule,
        StorageServiceModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        ExamplesModule
    ],
    providers: [ { provide: LOCALE_ID, useValue: 'fr' },AuthGuardService,AuthService],
    bootstrap: [AppComponent]
})

export class AppModule { }
