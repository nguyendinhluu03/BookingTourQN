import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { Xacthuc } from './xacthuc';
import { UserService } from '../service/user-service';

const routes: Routes = [
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    Xacthuc,
    UserService
  ],
})
export class AdminRoutingModule { }
