import { Vehicles } from './../../../model/vehicles';
import { Component, Input, OnInit } from '@angular/core';
import { VehiclesService } from '../../../service/vehicles-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrl: './list-vehicles.component.css'
})
export class ListVehiclesComponent {
  constructor(private vehiclesService: VehiclesService, private router:Router, private route: ActivatedRoute) {}

  DSVehicle: Vehicles[] = [];
  vehicles:Vehicles;
  vehiclesSearch: any[] = [];
  dangThemSua:boolean= false;
  tieude:any;
  searchText: string = '';

  ngOnInit(): void {
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

  timkiem() {
    this.vehiclesService.timkiem(this.searchText)
      .subscribe({
        next: (vehiclesSearch) => {
          this.vehiclesSearch = vehiclesSearch;
          this.vehiclesSearch.forEach(vehicles => {
            vehicles.PathAnh = this.vehiclesService.PhotosUrl + "/" + vehicles.Image;
          });
        },
        error: (err) => {
          console.error('Đã xảy ra lỗi khi tìm kiếm tour:', err);
        }
      });
  }

  chitietVehicles(vehicles:any){
    this.vehicles = vehicles;
    this.dangThemSua=true;
    this.tieude = "Cập nhật phương tiện";
  }

  themVehicles(){
    this.vehicles={
      Id:0,
      Name:"",
      Type:"",
      Image:"",
      PathAnh:""
    }
    this.dangThemSua=true;
    this.tieude="Thêm phương tiện";
  }

  dong(){
    this.dangThemSua=false;
    this.layDSVehicles();
  }

  xoaTour(id: number){
    if (confirm("Bạn có chắc chắn muốn xóa không?")){
      this.vehiclesService.deleteVehicles(id).subscribe({
        next: () => {
          console.log('Xóa thành công.');
          this.layDSVehicles();
        },
        error: (error) => {
          console.error('Xóa thất bại:', error);
        }
      });
    }
  }
}
