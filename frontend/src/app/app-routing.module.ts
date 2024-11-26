import { Xacthuc } from './admin/xacthuc';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourDetailComponent } from './home/tour/tour-detail/tour-detail.component';
import { TrangChuComponent } from './home/trang-chu/trang-chu.component';
import { TourListComponent } from './home/tour/tour-list/tour-list.component';
import { TourDMComponent } from './home/tour/tour-dm/tour-dm.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ListTourAdminComponent } from './admin/tour/list-tour-admin/list-tour-admin.component';
import { ListtourIdDMComponent } from './admin/tour/listtour-id-dm/listtour-id-dm.component';
import { ListdanhmucComponent } from './admin/danhmuc/listdanhmuc/listdanhmuc.component';
import { CreatedanhmucComponent } from './admin/danhmuc/createdanhmuc/createdanhmuc.component';
import { ListDonhangComponent } from './admin/donhang/list-donhang/list-donhang.component';
import { CreateDonhangComponent } from './admin/donhang/create-donhang/create-donhang.component';
import { DetailsDanhmucComponent } from './admin/danhmuc/details-danhmuc/details-danhmuc.component';
import { ListVehiclesComponent } from './admin/vehicles/list-vehicles/list-vehicles.component';
import { DetailVehiclesComponent } from './admin/vehicles/detail-vehicles/detail-vehicles.component';
import { ChitietDonhangComponent } from './admin/donhang/chitiet-donhang/chitiet-donhang.component';
import { DangKyComponent } from './admin/user/dang-ky/dang-ky.component';
import { DangNhapComponent } from './admin/user/dang-nhap/dang-nhap.component';
import { TrangchuAdminComponent } from './admin/trangchu-admin/trangchu-admin.component';
import { ThongkeComponent } from './admin/donhang/thongke/thongke.component';

const routes: Routes = [
  { path: 'login', component: DangNhapComponent },
  { path: 'user/register', component: DangKyComponent },

  { path: 'admin', component: AdminComponent, canActivate: [Xacthuc], children: [
    // Các route admin
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: 'admin', component: TrangchuAdminComponent },
    { path: 'trangchuad', component: TrangchuAdminComponent },
    { path: 'tour/tourlist', component: ListTourAdminComponent },
    { path: 'tour/tourIdDM/:id', component: ListtourIdDMComponent},
    { path: 'danhmuc/list', component: ListdanhmucComponent },
    { path: 'danhmuc/create', component: CreatedanhmucComponent },
    { path: 'danhmuc/details/:id', component: DetailsDanhmucComponent },
    { path: 'donhang/list', component: ListDonhangComponent },
    { path: 'booking', component: ThongkeComponent },
    { path: 'donhang/create', component: CreateDonhangComponent },
    { path: 'donhang/detail/:id', component: ChitietDonhangComponent },
    { path: 'vehicles/list', component: ListVehiclesComponent },
    { path: 'vehicles/detail/:id', component: DetailVehiclesComponent },
  ]},
  { path: 'home', component: HomeComponent, children: [
    // Các route của home
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: TrangChuComponent },
    { path: 'tour/trangchu', component: TrangChuComponent },
    { path: 'tour/detail/:id', component: TourDetailComponent },
    { path: 'tour/list', component: TourListComponent },
    { path: 'tour/TourDM/:id', component: TourDMComponent },
    { path: '**', redirectTo: '/tour/trangchu' }
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
