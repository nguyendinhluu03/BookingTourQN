import { Component } from '@angular/core';
import { Vehicles } from '../../../model/vehicles';
import { VehiclesService } from '../../../service/vehicles-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-vehicles',
  templateUrl: './detail-vehicles.component.html',
  styleUrl: './detail-vehicles.component.css'
})
export class DetailVehiclesComponent {

  public vehicles: Vehicles;


  constructor(private vehiclesService:VehiclesService, private route: ActivatedRoute){}

  ngOnInit() {
    const vehicleId = Number(this.route.snapshot.paramMap.get('id'));
    if (vehicleId) {
      this.vehiclesDetail(vehicleId);
    } else {
      console.error("Lỗi! Tour ID is invalid or not found.");
    }
  }

  vehiclesDetail(id: number) {
    this.vehiclesService.getVehiclesDetails(id)
      .subscribe({
        next: (vehicles) => {
          this.vehicles = vehicles;
          this.vehicles.PathAnh = this.vehiclesService.PhotosUrl + "/" + this.vehicles.Image;
        },
        error: (err) => {
          console.error('Error fetching tour details:', err);
        }
      });
  }
}
