import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentsVendorsComponent } from './components/agents-vendors/agents-vendors.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  // {path:"dashboard",component:DashboardComponent},
  {path:"",redirectTo:"agents-vendors",pathMatch:"full"},
  {path:"login",component:LoginComponent,canActivate:[LoginGuard]},
  {path:"agents-vendors",component:AgentsVendorsComponent,canActivate:[AuthGuard]},
  {path:"**",redirectTo:"agents-vendors"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
