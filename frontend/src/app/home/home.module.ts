import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TourDMComponent } from './tour/tour-dm/tour-dm.component';
import { FormsModule } from '@angular/forms';
import { TourListComponent } from './tour/tour-list/tour-list.component';
import { TourDetailComponent } from './tour/tour-detail/tour-detail.component';
import { TrangChuComponent } from './trang-chu/trang-chu.component';


@NgModule({
  declarations: [
    TrangChuComponent,
    TourListComponent,
    TourDetailComponent,
    TourDMComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    FormsModule,

  ]
})
export class HomeModule { }
