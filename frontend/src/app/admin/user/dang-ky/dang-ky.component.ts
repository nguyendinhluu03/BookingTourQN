import { Component } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user-service';

@Component({
  selector: 'app-dang-ky',
  templateUrl: './dang-ky.component.html',
  styleUrls: ['./dang-ky.component.css']
})
export class DangKyComponent {

  username: string;
  password: string;
  rePassword: string;

  constructor(private userService: UserService) {}

  dangKy() {
    if (!this.username || !this.password || !this.rePassword) {
      alert('Vui lòng nhập đầy đủ thông tin đăng ký');
      return;
    }

    if (this.password !== this.rePassword) {
      alert('Mật khẩu không khớp');
      return;
    }

    const userData = {
      username: this.username,
      password: this.password
    };

    this.userService.dangKy(userData).subscribe(
      res => {
        alert('Đăng ký thành công');
        this.username = '';
        this.password = '';
        this.rePassword = '';
      },
      error => {
        alert('Đăng ký thất bại');
        console.error(error);
      }
    );
  }

}
