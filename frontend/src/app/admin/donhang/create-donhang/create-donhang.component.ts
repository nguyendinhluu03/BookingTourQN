import { UserService } from './../../../service/user-service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Donhang } from '../../../model/donhang';
import { DonhangService } from '../../../service/donhang-service';
import { Tour } from '../../../model/tour';
import { TourService } from '../../../service/tour-service';
import { Vehicles } from '../../../model/vehicles';
import { VehiclesService } from '../../../service/vehicles-service';

@Component({
  selector: 'app-create-donhang',
  templateUrl: './create-donhang.component.html',
  styleUrls: ['./create-donhang.component.css']
})
export class CreateDonhangComponent {
  tour: Tour;
  Name: string = '';
  sdt: string = '';
  soLuong: number = 0;
  ngayKhoiHanh: Date;
  idTour: number = 0;
  idXe: number = 0;
  Gia: number = 0;
  donhang: Donhang;
  DsTour: Tour[] = [];
  DSVehicle: Vehicles[] = [];

  constructor(private http: DonhangService, private router: Router,
          private tourService: TourService, private vehiclesService:VehiclesService,
          private userService: UserService,) {}

  ngOnInit(): void {
    this.layDSTour();
    this.layDSVehicles();
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

  updateGia() {
    if (this.tour && this.soLuong) {
      this.Gia = this.soLuong * this.tour.Gia;
    }
  }

  layTour() {
    if (!this.idTour) {
      console.error('ID Tour is required');
    }
    return this.tourService.getTourDetails(this.idTour);
  }

  themDonhang() {
    this.layTour().subscribe({
      next: (tour) => {
        this.tour = tour;
        this.updateGia();
        const val = {
          Name: this.Name,
          SDT: this.sdt,
          SoLuong: this.soLuong,
          NgayKhoiHanh: this.ngayKhoiHanh,
          IDTour: this.idTour,
          IDXe: this.idXe,
          Gia: this.Gia,
        };

        this.http.addDsDonhang(val).subscribe(
          result => {
            console.log('Thêm thành công', result);
            alert('Thêm thành công!');
            this.router.navigate(['/admin/donhang/list']);
          },
          error => {
            console.error('There was an error adding the category!', error);
          }
        );
      },
      error: (err) => {
        console.error('Error fetching tour details:', err);
      }
    });
  }
}
