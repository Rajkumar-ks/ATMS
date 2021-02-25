import { LoaderServiceService } from './../service/loader-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  
  constructor(private loaderservice : LoaderServiceService) { }
  isLoading: Subject<boolean> = this.loaderservice.isLoading;

  ngOnInit() {
  }

  color = 'primary';
  mode = 'indeterminate';
  value = 20;

}
