import { Component, OnInit } from '@angular/core';
import { Tour } from '../../../model/tour';
import { TourService } from '../../../service/tour-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listtour-id-dm',
  templateUrl: './listtour-id-dm.component.html',
  styleUrl: './listtour-id-dm.component.css'
})
export class ListtourIdDMComponent implements OnInit {

  constructor(private tourService: TourService, private route: ActivatedRoute) {}

  tours:Tour[] = [];

  ngOnInit(){
    const DMId = Number(this.route.snapshot.paramMap.get('id'));
    this.layTourByDM(DMId);
  }

  layTourByDM(id:number){
    this.tourService.getTourByIdDM(id)
      .subscribe({
        next: (tours) => {
          this.tours = tours;
          this.tours.forEach(tour => {
            tour.PathAnh = this.tourService.PhotosUrl + "/" + tour.Anh;
          });
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
  }
}
