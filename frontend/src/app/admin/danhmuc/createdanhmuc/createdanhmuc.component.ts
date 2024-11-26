import { Component, Input, input } from '@angular/core';
import { DanhmucService } from '../../../service/danhmuc-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Danhmuc } from '../../../model/danhmuc';

@Component({
  selector: 'app-createdanhmuc',
  templateUrl: './createdanhmuc.component.html',
  styleUrl: './createdanhmuc.component.css'
})
export class CreatedanhmucComponent {

  name: string='';
  description: string='';
  @Input() danhmuc:Danhmuc;

  constructor (private http: DanhmucService,
    private router: Router
  ){
   }

   ngOnInit(): void {
    this.name = this.danhmuc.name;
    this.description = this.danhmuc.description;
  }

  themDanhmuc() {
    const val = {
      name : this.name,
      description : this.description,

    }
    this.http.addDsdanhmuc(val).subscribe(
      result => {
        console.log('Thêm thành công', result);
        alert('Thêm thành công!');
        this.router.navigate(['/admin/danhmuc/list']);
      },
      error => {
        console.error('There was an error adding the category!', error);
      }
    );
  }

}
