import { Component, Input, OnInit } from '@angular/core';
import { Tour } from '../../../model/tour';
import { TourService } from '../../../service/tour-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-tour-admin',
  templateUrl: './list-tour-admin.component.html',
  styleUrl: './list-tour-admin.component.css'
})
export class ListTourAdminComponent implements OnInit  {

  constructor(private tourService: TourService, private router:Router, private route: ActivatedRoute) {}

  DSTour: Tour[];
  tour:Tour;
  tourSearch: any[] = [];
  dangThemSua:boolean= false;
  tieude:any;
  searchText: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchText = params['search'] || '';
      if (this.searchText) {
        this.timkiem();
      }
    });
    this.layDSTour();

  }

  layDSTour(){
    this.tourService.getTours().subscribe(data => {
      this.DSTour = data;
      this.tourSearch = this.DSTour;
      this.DSTour.forEach(tour => {
        tour.PathAnh = this.tourService.PhotosUrl + "/" + tour.Anh;
      });
    });
  }

  xoaTour(id: number){
    if (confirm("Bạn có chắc chắn muốn xóa không?")){
      this.tourService.deleteTour(id).subscribe({
        next: () => {
          console.log('Xóa thành công.');
          this.layDSTour();
        },
        error: (error) => {
          console.error('Xóa thất bại:', error);
        }
      });
    }
  }

  timkiem() {
    this.tourService.timkiem(this.searchText)
      .subscribe({
        next: (tourSearch) => {
          this.tourSearch = tourSearch;
          this.tourSearch.forEach(tour => {
            tour.PathAnh = this.tourService.PhotosUrl + "/" + tour.Anh;
          });
        },
        error: (err) => {
          console.error('Đã xảy ra lỗi khi tìm kiếm tour:', err);
        }
      });
  }

  themTour(){
    this.tour={
      Id:0,
      Ten:"",
      category_id:0,
      NoiXuatPhat:"",
      NoiDen:"",
      ThoiGian:"",
      Gia:0,
      Anh:"",
      PathAnh:""
    }
    this.dangThemSua=true;
    this.tieude="Thêm Tour";
  }

  chitietTour(tour:any){
    this.tour = tour;
    this.dangThemSua=true;
    this.tieude = "Sửa tour";
  }

  dong(){
    this.dangThemSua=false;
    this.layDSTour();
  }
}
