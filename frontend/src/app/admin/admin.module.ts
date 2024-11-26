import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { CreateUpdateTourComponent } from './tour/create-update-tour/create-update-tour.component';
import { ListTourAdminComponent } from './tour/list-tour-admin/list-tour-admin.component';
import { ListtourIdDMComponent } from './tour/listtour-id-dm/listtour-id-dm.component';
import { ListdanhmucComponent } from './danhmuc/listdanhmuc/listdanhmuc.component';
import { CreatedanhmucComponent } from './danhmuc/createdanhmuc/createdanhmuc.component';
import { ListDonhangComponent } from './donhang/list-donhang/list-donhang.component';
import { CreateDonhangComponent } from './donhang/create-donhang/create-donhang.component';
import { DetailsDanhmucComponent } from './danhmuc/details-danhmuc/details-danhmuc.component';
import { ListVehiclesComponent } from './vehicles/list-vehicles/list-vehicles.component';
import { CreateUpdateVehiclesComponent } from './vehicles/create-update-vehicles/create-update-vehicles.component';
import { DetailVehiclesComponent } from './vehicles/detail-vehicles/detail-vehicles.component';
import { ChitietDonhangComponent } from './donhang/chitiet-donhang/chitiet-donhang.component';
import { DangKyComponent } from './user/dang-ky/dang-ky.component';
import { DangNhapComponent } from './user/dang-nhap/dang-nhap.component';
import { TrangchuAdminComponent } from './trangchu-admin/trangchu-admin.component';
import { ThongkeComponent } from './donhang/thongke/thongke.component';


@NgModule({
  declarations: [
    AdminComponent,
    CreateUpdateTourComponent,
    ListTourAdminComponent,
    ListtourIdDMComponent,
    ListdanhmucComponent,
    CreatedanhmucComponent,
    ListDonhangComponent,
    CreateDonhangComponent,
    DetailsDanhmucComponent,
    ListVehiclesComponent,
    CreateUpdateVehiclesComponent,
    DetailVehiclesComponent,
    ChitietDonhangComponent,
    DangKyComponent,
    DangNhapComponent,
    TrangchuAdminComponent,
    ThongkeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
