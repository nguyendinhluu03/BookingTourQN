import { Component, OnInit } from '@angular/core';
import { DonhangService } from '../../../service/donhang-service';
import { Donhang } from '../../../model/donhang';
import { Tour } from '../../../model/tour';
import { TourService } from '../../../service/tour-service';
import { Vehicles } from '../../../model/vehicles';
import { VehiclesService } from '../../../service/vehicles-service';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user-service';


@Component({
  selector: 'app-list-donhang',
  templateUrl: './list-donhang.component.html',
  styleUrl: './list-donhang.component.css'
})

export class ListDonhangComponent implements OnInit {
    constructor(
      private service: DonhangService,
      private tourService:TourService,
      private vehiclesService:VehiclesService,
      private router: Router,
      private userService: UserService
    ) { }

    DSDonHang: any=[];
    Name: string;
    Sdt: string;
    SoLuong: number;
    NgayKhoiHanh: string = '';
    IDTour: number = 0;
    IDXe: number = 0;
    Gia: number= 0;
    them: boolean = false;
    donhang: Donhang;
    selected: any = null;
    tour:Tour;
    vehicles:Vehicles;
    DsTour: Tour[] = [];
    DSVehicle: Vehicles[] = [];

    ngOnInit(): void {
      this.tailaiDSDonhang();
      this.layDSTour();
      this.layDSVehicles();
    }

    tailaiDSDonhang() {
      this.service.getDsDonHang().subscribe(data => {
        this.DSDonHang = data;
        this.DSDonHang.forEach(donhang => {
          this.tourService.getTourDetails(donhang.IDTour).subscribe(
            tour => {
              donhang.TourTen = tour.Ten;
            });
          this.vehiclesService.getVehiclesDetails(donhang.IDXe).subscribe(
            vehicle => {
              donhang.VehiclesTen = vehicle.Name;
            });
        });
      });
    }


    xoaDsDonhang(donhang: Donhang) {
      this.service.deleteDsDonhang(donhang.ID).subscribe(
        (data) => {
          console.log(data);
          this.tailaiDSDonhang();
        }
      );
    }

    formatDate(date: Date): string {
      const d = new Date(date);
      const month = '' + (d.getMonth() + 1);
      const day = '' + d.getDate();
      const year = d.getFullYear();

      return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
    }

    layDSTour(){
      this.tourService.getTours().subscribe(data => {
        this.DsTour = data;
      });
    }

    layDSVehicles(){
      this.vehiclesService.getVehicles().subscribe(data => {
        this.DSVehicle = data;
      });
    }

    editDonHang(donhang: Donhang) {
      this.selected = donhang;
      this.Name = this.selected.Name;
      this.Sdt = this.selected.Sdt;
      this.SoLuong = this.selected.SoLuong;
      this.NgayKhoiHanh = this.formatDate(this.selected.NgayKhoiHanh);
      this.IDTour = this.selected.IDTour;
      this.IDXe = this.selected.IDXe;
      this.Gia = this.selected.Gia;
    }

    updateGia() {
      if (this.tour && this.SoLuong) {
        this.Gia = this.SoLuong * this.tour.Gia;
      }
    }

    layTour() {
      if (!this.IDTour) {
        console.error('ID Tour is required');
      }
      return this.tourService.getTourDetails(this.IDTour);
    }

    suaDonHang() {
      if (!this.selected || !this.selected.ID) {
        console.error('Đơn hàng chưa được chọn hoặc không hợp lệ.');
        return;
      }

      this.layTour().subscribe({
        next: (tour) => {
          this.tour = tour;
          this.updateGia();
          const val = {
            ID: this.selected.ID,
            Name: this.Name,
            SDT: this.Sdt,
            SoLuong: this.SoLuong,
            NgayKhoiHanh: this.NgayKhoiHanh,
            IDTour: this.IDTour,
            IDXe: this.IDXe,
            Gia: this.Gia,
          };

          this.service.updateDsDonhang(this.selected.ID, val).subscribe(
            response => {
              this.tailaiDSDonhang();
              alert('Sửa đơn hàng thành công!');
            },
            error => {
              console.error('Có lỗi khi sửa đơn hàng!', error);
              if (error.error) {
                console.error('Chi tiết lỗi:', error.error);
              }
            }
          );
        },
        error: (error) => {
          console.error('Lỗi khi lấy thông tin tour:', error);
        }
      });
    }

}
