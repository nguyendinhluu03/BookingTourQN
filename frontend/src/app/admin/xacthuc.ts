import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/user-service';

@Injectable({
  providedIn: 'root'
})
export class Xacthuc implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const userId = this.userService.getUserId();

    if (userId !== null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

