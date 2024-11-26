import { UserService } from './../../../service/user-service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Donhang } from '../../../model/donhang';
import { DonhangService } from '../../../service/donhang-service';
import { Tour } from '../../../model/tour';
import { TourService } from '../../../service/tour-service';
import { Vehicles } from '../../../model/vehicles';
import { VehiclesService } from '../../../service/vehicles-service';
import { BookingService } from '../../../service/booking-service';
import { Booking } from '../../../model/booking';

@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrl: './thongke.component.css'
})
export class ThongkeComponent {
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
  DSBooking: Booking[]=[];

  constructor(private http: DonhangService, private router: Router,
          private tourService: TourService, private vehiclesService:VehiclesService,
          private userService: UserService, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.layDSBooking();
   // this.layTour();
  }

  layDSBooking() {
    this.bookingService.getDs5Booking().subscribe(data => {
      this.DSBooking = data;
      this.DSBooking.forEach(booking => {
        this.tourService.getTourDetails(booking.IDTour).subscribe(
          tour => {
            booking.IDTour = tour.Ten;
          });
        });
     });
  }

  // layTour() {
  //   if (!this.idTour) {
  //     console.error('ID Tour is required');
  //   }
  //   return this.tourService.getTourDetails(this.idTour);
  // }
}
