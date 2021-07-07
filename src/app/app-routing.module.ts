import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './index/error-page/error-page.component';
import { IndexComponent } from './index/index/index.component';
import { LandingComponent } from './index/landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
 
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
