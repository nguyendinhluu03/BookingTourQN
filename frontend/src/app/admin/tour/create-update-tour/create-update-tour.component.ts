import { Component, Input } from '@angular/core';
import { Tour } from '../../../model/tour';
import { TourService } from '../../../service/tour-service';
import { Danhmuc } from '../../../model/danhmuc';
import { DanhmucService } from '../../../service/danhmuc-service';

@Component({
  selector: 'app-create-update-tour',
  templateUrl: './create-update-tour.component.html',
  styleUrl: './create-update-tour.component.css'
})
export class CreateUpdateTourComponent {

  id: number;
  ten: string;
  category_id: number;
  noixuatphat: string;
  noiden: string;
  thoigian: string;
  anh: string;
  gia: number;
  @Input() tour:Tour;
  DsDanhmuc: Danhmuc[] = [];


  constructor(private tourService: TourService, private danhmucService: DanhmucService){}

  ngOnInit(): void{
    this.ten = this.tour.Ten;
    this.category_id = this.tour.category_id;
    this.noixuatphat = this.tour.NoiXuatPhat;
    this.noiden = this.tour.NoiDen;
    this.thoigian = this.tour.ThoiGian;
    this.gia = this.tour.Gia;
    this.anh = this.tour.Anh;

    if (this.anh){
      this.tour.PathAnh = this.tourService.PhotosUrl + "/" + this.anh;
    } else{
      this.tour.Anh = "com.jpg";
      this.tour.PathAnh = this.tourService.PhotosUrl + "/" + this.tour.Anh;
    }

    this.DsDanhMucSp();
  }

  DsDanhMucSp() {
    this.danhmucService.getDsdanhmuc().subscribe(data => {
      this.DsDanhmuc = data;
    });
  }

  createTour(){
    var val= {
      Ten:this.ten,
      category_id: this.category_id,
      NoiXuatPhat:this.noixuatphat,
      NoiDen:this.noiden,
      ThoiGian:this.thoigian,
      Gia:this.gia,
      Anh:this.tour.Anh
    };
    this.tourService.postTour(val).subscribe(res =>{
      alert('Thêm thành công');
    });
  }

  suaTour(id:number){
    var val = {
      Id: id,
      ten:this.ten,
      category_id: this.category_id,
      noixuatphat:this.noixuatphat,
      noiden:this.noiden,
      thoigian:this.thoigian,
      gia:this.gia,
      anh:this.tour.Anh
    };
    console.log(val);
    this.tourService.updateTour(id, val).subscribe(res =>{
      alert('Sửa thành công');
    });
  }

  uploadPhoto(event:any){
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.tourService.taiAnh(formData).subscribe((data:any) => {
      this.tour.Anh = data.toString();
      this.tour.PathAnh = this.tourService.PhotosUrl + "/" + this.tour.Anh;
    })
  }
}
