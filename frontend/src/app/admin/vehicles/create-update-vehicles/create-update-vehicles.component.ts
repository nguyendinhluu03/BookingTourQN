import { Component, Input, OnInit } from '@angular/core';
import { VehiclesService } from '../../../service/vehicles-service';
import { Vehicles } from '../../../model/vehicles';

@Component({
  selector: 'app-create-update-vehicles',
  templateUrl: './create-update-vehicles.component.html',
  styleUrl: './create-update-vehicles.component.css'
})

export class CreateUpdateVehiclesComponent implements OnInit {
  @Input() vehicles: Vehicles;
  ten: string;
  anh: string;
  loai: string;
  public message = null;
  DSVehicle: Vehicles[] = [];

  constructor(private vehiclesService: VehiclesService) {}

  ngOnInit(): void {
    this.ten = this.vehicles.Name;
    this.loai = this.vehicles.Type;
    this.anh = this.vehicles.Image;

     if (this.vehicles.Image) {
      this.vehicles.PathAnh = this.vehiclesService.PhotosUrl + "/" + this.anh;
    } else {
      this.anh = "anhxe4cho.jpg";
      this.vehicles.Image = this.anh;
      this.vehicles.PathAnh = this.vehiclesService.PhotosUrl + "/" + this.anh;
    }

    this.layDSVehicles();
  }

  layDSVehicles(): void {
    this.vehiclesService.getVehicles().subscribe(data => {
      this.DSVehicle = data;
      this.DSVehicle.forEach(vehicle => {
        vehicle.PathAnh = this.vehiclesService.PhotosUrl + "/" + vehicle.Image;
      });
      console.log(this.DSVehicle);
    }, error => {
      console.error('Error fetching vehicles:', error);
    });
  }


  createVehicles() {
    const val = {
      Name: this.ten,
      Image: this.vehicles.Image,
      Type: this.loai,
    };
    this.vehiclesService.postVehicles(val).subscribe(
      res => {
        alert('Thêm thành công');
      },
      error => {
        console.error('Có lỗi xảy ra!', error);
        this.message = error.error.message || 'Có lỗi xảy ra!';
      }
    );
  }

  updateVehicles(id: number) {
    const val = {
      Id: id,
      Name: this.ten,
      Image: this.vehicles.Image,
      Type: this.loai
    };
    this.vehiclesService.updateVehicles(id, val).subscribe(
      res => {
        alert('Sửa thành công');
      },
      error => {
        console.error('Có lỗi xảy ra khi sửa!', error);
        this.message = error.error.message || 'Có lỗi xảy ra khi sửa!';
      }
    );
  }

  uploadPhoto(event:any){
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.vehiclesService.taiAnh(formData).subscribe((data:any) => {
      this.vehicles.Image = data.toString();
      this.vehicles.PathAnh = this.vehiclesService.PhotosUrl + "/" + this.vehicles.Image;
    })
  }

}
