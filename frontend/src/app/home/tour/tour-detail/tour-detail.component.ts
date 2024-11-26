import { Component, OnInit } from '@angular/core';
import { Tour } from '../../../model/tour';
import { TourService } from '../../../service/tour-service';
import { ActivatedRoute } from '@angular/router';
import { Vehicles } from '../../../model/vehicles';
import { VehiclesService } from '../../../service/vehicles-service';
import { DonhangService } from '../../../service/donhang-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.css'
})
export class TourDetailComponent {

  public tour: Tour;
  Name: string = '';
  sdt: string = '';
  soLuong: number = 0;
  ngayKhoiHanh: Date;
  idTour: number = 0;
  idXe: number = 0;
  Gia: number = 0;
  DSVehicle: Vehicles[] = [];
  dangThemSua:boolean= false;


  constructor(private tourService:TourService, private route: ActivatedRoute, private router:Router,
    private vehiclesService:VehiclesService, private donhangService:DonhangService){}

  ngOnInit() {
    const tourId = Number(this.route.snapshot.paramMap.get('id'));
    if (tourId) {
      this.idTour = tourId;
      this.tourDetail(tourId);
    } else {
      console.error("Lỗi! Tour ID is invalid or not found.");
    }
    this.layDSVehicles();
  }

  //Lấy tour bằng id
  tourDetail(id: number) {
    this.tourService.getTourDetails(id)
      .subscribe({
        next: (tour) => {
          this.tour = tour;
          this.tour.PathAnh = this.tourService.PhotosUrl + "/" + this.tour.Anh;
        },
        error: (err) => {
          console.error('Error fetching tour details:', err);
        }
      });
  }

  //lấy danh sách xe
  layDSVehicles(){
    this.vehiclesService.getVehicles().subscribe(data => {
      this.DSVehicle = data;
    });
  }

  // Đặt tour
  layTour() {
    if (!this.tour.Id) {
      console.error('ID Tour is required');
    }
    return this.tourService.getTourDetails(this.idTour);
  }

  updateGia() {
    if (this.tour && this.soLuong) {
      this.Gia = this.soLuong * this.tour.Gia;
    }
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
    this.donhangService.addDsDonhang(val).subscribe(
        result => {
          alert('Đặt tour thành công!');
        },
          error => {
          console.error('Lỗi!', error);
          });
      },
    });
  }

  //đóng hộp thoại
  dong(){
    this.dangThemSua=false;
    this.tourDetail(this.idTour);
  }

}
