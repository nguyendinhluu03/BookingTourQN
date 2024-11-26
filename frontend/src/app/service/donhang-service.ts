import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class DonhangService {
  private APIURL = 'http://localhost:5093/api';
  private httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  public getDsDonHang(): Observable<any> {
    const url = `${this.APIURL}/DonHangs`;
    return this.http.get<any>(url, this.httpOptions)
  }

  public addDsDonhang(data:any){
    const url = `${this.APIURL}/DonHangs`;
    return this.http.post<any>(url, data)
  }

  public getDonHangDetails(id: number): Observable<any> {
    const url = `${this.APIURL}/DonHangs/${id}`;
    return this.http.get<any>(url);
  }

  public deleteDsDonhang(id:number){
    const url = `${this.APIURL}/DonHangs/${id}`;
    return this.http.delete<any>(url, this.httpOptions)
  }

  public updateDsDonhang(id: number,data: any): Observable<any> {
    const url = `${this.APIURL}/DonHangs/${id}`;
    return this.http.put<any>(url, data, this.httpOptions)
      .pipe(
        catchError(error => {
          return throwError('Failed to update DonHang');
        })
      );
  }
}
