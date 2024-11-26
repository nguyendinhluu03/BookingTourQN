import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject } from "rxjs";



@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private APIURL = 'http://localhost:5093/api';
  private httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": 'application/json'
    })
}
  constructor(private http : HttpClient) { }


  public getDsBooking(): Observable<any> {
    const url = `${this.APIURL}/Booking`;
    return this.http.get<any>(url, this.httpOptions)
  }

  public getDs5Booking(): Observable<any> {
    const url = `${this.APIURL}/Booking/Top5`;
    return this.http.get<any>(url, this.httpOptions)
  }
 

}

