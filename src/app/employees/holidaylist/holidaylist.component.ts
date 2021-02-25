import { UserService } from './../../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { ActivatedRoute,Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-holidaylist',
  templateUrl: './holidaylist.component.html',
  styleUrls: ['./holidaylist.component.css']
})
export class HolidaylistComponent implements OnInit {

  
  res : any;
  holidaysListDisplay: any;
  rows = [];
  public srch = [];



  constructor(private appService:AppService,
    private router:Router,
    private route:ActivatedRoute,
    private fb : FormBuilder,
    private userService : UserService) { 
    this.rows = appService.leaves;
    this.srch = [...this.rows];
     
   
    
  }
  ngOnInit() {
    this.userService.getHolidayList().subscribe(
      res => {
        this.holidaysListDisplay = res;
        console.log("Leave config List for HR res", this.holidaysListDisplay);
      },
      err => {
        console.log("API Failure for Leave config list for HR");
      }
    );
  }

}


