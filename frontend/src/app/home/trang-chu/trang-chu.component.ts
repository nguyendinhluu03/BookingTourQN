import { Component, Input, OnInit } from '@angular/core';
import { Tour } from '../../model/tour';
import { TourService } from '../../service/tour-service';
import { Danhmuc } from '../../model/danhmuc';
import { DanhmucService } from '../../service/danhmuc-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trang-chu',
  templateUrl: './trang-chu.component.html',
  styleUrl: './trang-chu.component.css'
})
export class TrangChuComponent {}
