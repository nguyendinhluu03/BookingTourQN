import { Component } from '@angular/core';
import { DanhmucService } from '../../../service/danhmuc-service';
import { Router } from '@angular/router';
import { Danhmuc } from '../../../model/danhmuc';

@Component({
  selector: 'app-listdanhmuc',
  templateUrl: './listdanhmuc.component.html',
  styleUrl: './listdanhmuc.component.css'
})
export class ListdanhmucComponent {

  DsDanhmuc: any[] = [];
  tenDanhMuc: string = '';
  moTaDanhMuc: string = '';
  danhmuc: Danhmuc;
  them: boolean = false;
  selectedDanhMuc: any = null;

  constructor(private http: DanhmucService, private router: Router) {
  }

  ngOnInit(): void {
    this.DsDanhMucSp();
  }

  DsDanhMucSp() {
    this.http.getDsdanhmuc().subscribe(data => {
      this.DsDanhmuc = data;
    });
  }

  xoaDsDanhmuc(danhmuc: Danhmuc) {
    this.http.deleteDsdanhmuc(danhmuc.category_id).subscribe(
      (data) => {
        console.log(data);
        this.DsDanhMucSp();
      }
    );
  }

  editDanhMuc(danhmuc: Danhmuc) {
    this.selectedDanhMuc = danhmuc;
    this.tenDanhMuc = danhmuc ? danhmuc.name : '';
    this.moTaDanhMuc = danhmuc ? danhmuc.description : '';
  }

  suaDanhMuc() {
    if (!this.selectedDanhMuc || !this.selectedDanhMuc.category_id) {
      console.error('Danh mục chưa được chọn hoặc không hợp lệ.');
      return;
    }

    const val = { category_id: this.selectedDanhMuc.category_id, name: this.tenDanhMuc, description: this.moTaDanhMuc };
    this.http.updateDsDanhMuc(this.selectedDanhMuc.category_id, val).subscribe(
      response => {
        this.DsDanhMucSp();
        console.log('Sửa thành công:', response);
        alert('Sửa danh mục thành công!');
      },
      error => {
        console.error('Có lỗi khi sửa danh mục!', error);
        if (error.error) {
          console.error('Chi tiết lỗi:', error.error);
        }
      }
    );
  }

  dong() {
    this.them = false;
    this.DsDanhMucSp();
  }
}
