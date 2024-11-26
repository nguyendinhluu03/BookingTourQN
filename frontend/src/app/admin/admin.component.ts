import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent{
  localStorage?: Storage;

  constructor(private userService: UserService, private router: Router
  ){};


  tourSearch: any[] = [];
  searchText: string = '';
  timkiem() {
    this.router.navigate(['/admin/tour/tourlist'], { queryParams: { search: this.searchText } });
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  dangXuat() {
    this.userService.dangXuat().subscribe(res => {
        if (res.success) {
            this.router.navigate(['/login']);
            // Thêm logic xử lý sau khi đăng xuất thành công
        } else {
            alert('Đăng xuất thất bại');
        }
    });
  }
}
