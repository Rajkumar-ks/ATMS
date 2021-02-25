import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../service/user.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-leave-details-hr',
  templateUrl: './leave-details-hr.component.html',
  styleUrls: ['./leave-details-hr.component.css']
})
export class LeaveDetailsHrComponent implements OnInit {

  form: FormGroup;
  res: any;
  rows = [];
  public srch = [];
  leaveHistoryForHR: any;
  employeeList: any;
  empid = 'All';
  status = 'All';
  fromDate = 'null';
  toDate = 'null';


  page: Number = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  count: Number;

  public myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '38px'
  };



  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService) {
    this.rows = appService.leaves;
    this.srch = [...this.rows];
  }

  ngOnInit() {

    // this.form = this.fb.group({

    //   'fromDate' : new FormControl(
    //     '',Validators.required,
    //   ),
    //   'toDate' : new FormControl(
    //     '',Validators.required,
    //   ),

    // })


    this.userService.getProjectEmp().subscribe(
      res => {
        this.employeeList = res;
        console.log("Employee List res", this.employeeList);
      },
      err => {
        console.log("API Failure for Project Employee");
      }
    );

    this.empLeaveHistoryHR(this.empid, this.status, this.fromDate, this.toDate, this.page, this.pageSize);

  }



  searchEmployeeId(event) {
    this.empid = event
    console.log(event)
    this.empLeaveHistoryHR(this.empid, this.status, this.fromDate, this.toDate, this.page, this.pageSize);
  }

  searchStatus(event) {
    this.status = event
    console.log(event)
    this.empLeaveHistoryHR(this.empid, this.status, this.fromDate, this.toDate, this.page, this.pageSize);

  }

  searchfromDate(event) {

    this.fromDate = event.formatted
    console.log("Start Date ", this.fromDate);
    console.log(event)
    this.empLeaveHistoryHR(this.empid, this.status, this.fromDate, this.toDate, this.page, this.pageSize);
  }

  searchtoDate(event) {
    this.toDate = event.formatted
    console.log("To Date ", this.toDate);
    console.log(event)
    this.empLeaveHistoryHR(this.empid, this.status, this.fromDate, this.toDate, this.page, this.pageSize);

  }

  empLeaveHistoryHR(empid, status, fromDate, toDate, page, pageSize) {
    this.userService.getLeaveHistoryForHR(this.empid, status, this.fromDate, this.toDate, this.page, this.pageSize).subscribe(
      res => {
        this.leaveHistoryForHR = res.Data;
        this.count = res.Count;

        console.log("Emp List for HR res", res);
        console.log("Employee List for HR res", this.leaveHistoryForHR);
      },
      err => {
        console.log("API Failure for Employee leave history for HR");
      }
    );
  }

  downloadleave() {
    this.userService.downloadleaveList(this.empid, this.status, this.fromDate, this.toDate).subscribe(
      response => {
        let obj: any;
        window.open(response.path);
      },
      err => {
        console.log("Download API error", err);
      }
    );
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.empLeaveHistoryHR(this.empid, this.status, this.fromDate, this.toDate, this.page, this.pageSize);

  }

  handlePageChange(pageNo) {
    this.page = pageNo
    this.empLeaveHistoryHR(this.empid, this.status, this.fromDate, this.toDate, this.page, this.pageSize);
  }


  showReason(reason: string)
  {
  swal.fire({
  title: "Reason",
  html: reason,
  confirmButtonText: "Ok",
  });
  }
}


