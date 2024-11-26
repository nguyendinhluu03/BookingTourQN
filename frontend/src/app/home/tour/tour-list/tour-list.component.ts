import { Component, OnInit, Input } from '@angular/core';
import { Tour } from '../../../model/tour';
import { TourService } from '../../../service/tour-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Danhmuc } from '../../../model/danhmuc';
import { DanhmucService } from '../../../service/danhmuc-service';


@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {

constructor(private tourService: TourService, private router:Router,
  private route: ActivatedRoute, private danhmucService: DanhmucService) {}


  DSTour: Tour[];
  tour:Tour;
  tourSearch: any[] = [];
  dangThemSua:boolean= false;
  tieude:any;
  searchText: string = '';
  tours:Tour[] = [];
  @Input() danhMucId:any;
  @Input() DsDanhmuc: Danhmuc[] = [];;
  category_id: any;

  ngOnInit(): void {
      this.layDSTour();
      this.route.queryParams.subscribe(params => {
        this.searchText = params['search'] || '';
        this.timkiem();
      });
      this.DsDanhMucSp();
  }

  layDSTour(){
    this.tourService.getTours().subscribe(data => {
      this.DSTour = data;
      this.DSTour.forEach(tour => {
        tour.PathAnh = this.tourService.PhotosUrl + "/" + tour.Anh;
      });
    });
  }

  DsDanhMucSp() {
    this.danhmucService.getDsdanhmuc().subscribe(data => {
      this.DsDanhmuc = data;
    });
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

  timkiemIDDM() {
    this.tourService.getTourByIdDM(this.category_id)
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
}


