import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dang-nhap',
  templateUrl: './dang-nhap.component.html',
  styleUrl: './dang-nhap.component.css'
})
export class DangNhapComponent {
  id: number;
  username: string;
  password: string;
  rePassword: string;
  user: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = new User();
  }

  dangNhap() {
    const username = this.username;
    const password = this.password;

    this.userService.dangNhap(username, password).subscribe(res => {
      if (res.success) {
        this.router.navigate(['/admin/']);
      } else {
        alert('Đăng nhập thất bại');
      }
    });
  }


}
