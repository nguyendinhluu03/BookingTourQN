import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private APIUrl = 'http://localhost:5093/api';

  private httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": 'application/json'
    }),
    withCredentials: true
  }

  private isAuthenticatedFlag: boolean = false;
  private authenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  dangKy(body: any): Observable<any> {
    const url = `${this.APIUrl}/Users`;
    return this.http.post(url, body);
  }


  get authenticated$(): Observable<boolean> {
    return this.authenticatedSubject.asObservable();
  }

  dangNhap(username: string, password: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.http.post(`${this.APIUrl}/Users/login`, formData, { withCredentials: true })
      .pipe(
        tap(res => {
          if (res.success) {
            this.setAuthenticated(true);
            localStorage.setItem('userId', res.user.id);
            localStorage.setItem('username', res.user.username);

            console.log('UserId:', localStorage.getItem('userId'));
            console.log('Username:', localStorage.getItem('username'));
          }
        })
      );
  }

  dangXuat(): Observable<any> {
    return this.http.post(`${this.APIUrl}/Users/logout`, {}, this.httpOptions)
      .pipe(
        tap(() => {
          this.setAuthenticated(false);
          localStorage.removeItem('userId');
          localStorage.removeItem('username');
        })
      );
  }

  setAuthenticated(flag: boolean) {
    this.isAuthenticatedFlag = flag;
    this.authenticatedSubject.next(flag);
  }

  getUserId(){
    return localStorage.getItem('userId');
  }
}
