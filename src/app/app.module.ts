import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './index/navbar/navbar.component';
import { PromoComponent } from './index/promo/promo.component';
import { FooterComponent } from './index/footer/footer.component';
import { NotificationComponent } from './index/notification/notification.component';
import { ErrorPageComponent } from './index/error-page/error-page.component';
import { LandingComponent } from './index/landing/landing.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    PromoComponent,
    FooterComponent,
    NotificationComponent,
    ErrorPageComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
