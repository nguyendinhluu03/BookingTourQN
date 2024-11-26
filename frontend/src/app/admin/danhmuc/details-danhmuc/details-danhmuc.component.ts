import { Component } from '@angular/core';
import { Danhmuc } from '../../../model/danhmuc';
import { ActivatedRoute } from '@angular/router';
import { DanhmucService } from '../../../service/danhmuc-service';


@Component({
  selector: 'app-details-danhmuc',
  templateUrl: './details-danhmuc.component.html',
  styleUrl: './details-danhmuc.component.css'
})

export class DetailsDanhmucComponent {
    danhmuc: Danhmuc;
    constructor(
      private route: ActivatedRoute,
      private http: DanhmucService,

    ) {}

    ngOnInit() {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id) {
        this.tourDetail(id);
      } else {
        console.error("Lỗi! Tour ID is invalid or not found.");
      }
    }

    tourDetail(id: number) {
      this.http.getdetailsDanhMuc(id)
        .subscribe({
          next: (data) => {
            this.danhmuc = data;
          },
          error: (err) => {
            console.error('Error fetching  details:', err);
          }
        });
    }


}
