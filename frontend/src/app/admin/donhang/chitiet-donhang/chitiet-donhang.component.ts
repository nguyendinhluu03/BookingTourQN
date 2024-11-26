import { Donhang } from './../../../model/donhang';
import { Component, OnInit } from '@angular/core';
import { DonhangService } from '../../../service/donhang-service';
import { ActivatedRoute } from '@angular/router';
import { TourService } from '../../../service/tour-service';
import { VehiclesService } from '../../../service/vehicles-service';
import { Tour } from '../../../model/tour';
import { Vehicles } from '../../../model/vehicles';

@Component({
  selector: 'app-chitiet-donhang',
  templateUrl: './chitiet-donhang.component.html',
  styleUrls: ['./chitiet-donhang.component.css']
})
export class ChitietDonhangComponent implements OnInit {

  public donhang: Donhang;
  tour: Tour;
  vehicles: Vehicles;

  constructor(
    private donHangService: DonhangService,
    private route: ActivatedRoute,
    private tourService: TourService,
    private vehiclesService: VehiclesService
  ) {}

  ngOnInit() {
    const donhangId = Number(this.route.snapshot.paramMap.get('id'));
    if (donhangId) {
      this.donhangDetail(donhangId);
    } else {
      console.error("Lỗi! Tour ID is invalid or not found.");
    }
  }

  donhangDetail(id: number) {
    this.donHangService.getDonHangDetails(id)
      .subscribe({
        next: (donhang) => {
          this.donhang = donhang;

          this.tourService.getTourDetails(donhang.IDTour).subscribe(tour => {
            this.donhang.IDTour = tour.Ten;
          });

          this.vehiclesService.getVehiclesDetails(donhang.IDXe).subscribe(vehicle => {
            this.donhang.IDXe = vehicle.Name;
          });
        },
        error: (err) => {
          console.error('Error fetching tour details:', err);
        }
      });
  }
}
