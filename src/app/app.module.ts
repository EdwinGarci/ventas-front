import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
// Import NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { GlobalAuthEffects } from "../app/core/state/effects/global-auth.effects";
import { environment } from 'src/environments/environment';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from 'primeng/api';
import { CoreModule } from './core/core.module';
import { ROOT_REDUCERS } from "./core/state/app.state";
import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        EffectsModule.forRoot([GlobalAuthEffects]),
        StoreModule.forRoot(ROOT_REDUCERS),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        CountryService, 
        CustomerService, 
        EventService, 
        IconService, 
        NodeService,
        PhotoService, 
        ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
