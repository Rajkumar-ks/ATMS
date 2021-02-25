import { UserService } from './../../service/user.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import swal from 'sweetalert2/dist/sweetalert2.js';


declare const $: any;



interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {

  form: FormGroup;
  leaves: any;
  res: any;
  days: any;

  public myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '38px',
    disableWeekends: true,
  };

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });



  rows = [];

  public srch = [];
  public addL: any = {};
  addLeaveValidation: boolean = false;
  leaveListData: any;
  leaveTypeStatus: any;
  errorMessage: any;

  page: Number = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  count: Number;

  tempStartDate: string;
  tempEndDate: string;
  tempDay: string;
  LeavetypeForemp: any;
  sDate: any;
  eDate: any;
  leave_Type: any;
  status = "All";
  edDate = "null";
  stdDate = "null";

  foods: Food[] = [
    { value: 'business1', viewValue: 'Business Unit 1' },
    { value: 'business2', viewValue: 'Business Unit 2' },
    { value: 'business2', viewValue: 'Business Unit 3' }
  ];


  constructor(private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService) {
    this.rows = appService.leaves;
    this.srch = [...this.rows];

  }

  ngOnInit() {


    this.getDisplay()
    this.LeaveHistoryForEmp(this.status, this.stdDate, this.edDate, this.page, this.pageSize);
    this.gtLeavetypeForEmp()
    // this. WorkingDaysBtwnTwoDates(this.fromDate, this.toDate, this.selectSession)

    $('.floating').on('focus blur', function (e) {
      $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    // var date1 = new Date("7/13/2010");
    // var date2 = new Date("7/11/2010");
    // var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    // var diffDays = Math.ceil(timeDiff / (1000 3600 24));
    // console.log(diffDays);

    this.form = this.fb.group({
      'leaveType': new FormControl(
        '', Validators.required,
      ),
      'fromDate': new FormControl(
        '', Validators.required,
      ),
      'toDate': new FormControl(
        '', Validators.required,
      ),

      'reason': new FormControl(
        '', Validators.required,
      ),
      'selectSession': new FormControl(
        '', Validators.required,
      ),
      'no_of_days': new FormControl(this.days),
    });

  }
  // LeaveHistoryForEmp(page, pageSize) {
  //   this.userService.getLeaveHistoryForEmp(sessionStorage.getItem('emp_id'), this.page, this.pageSize).subscribe(
  //     res => {
  //       console.log("API Success for Leaves", res);
  //       this.leaveListData = res.Data
  //       this.count = res.Count;

  //       console.log("************", this.leaveListData)
  //     },
  //     err => {
  //       console.log("API Failure for Leaves", err.message);
  //     }
  //   );
  //  }
  getDisplay() {
    this.userService.getEmployeeLeaveTypeStatus(sessionStorage.getItem('emp_id')).subscribe(
      res => {
        console.log("API Success for Leaves", res);
        this.leaveTypeStatus = res
        console.log("************", this.leaveTypeStatus)
      },
      err => {
        console.log("API Failure for Leaves", err.message);
      }
    );
  }



  get leaveType() {
    return this.form.get('leaveType')
  }

  get fromDate() {
    return this.form.get('fromDate')
  }

  get toDate() {
    return this.form.get('toDate')
  }


  get no_of_days() {
    return this.form.get('no_of_days')
  }
  get reason() {
    return this.form.get('reason')
  }

  get selectSession() {
    return this.form.get('selectSession')
  }

  startDateOnchange(startDateEvent) {
    this.tempStartDate = startDateEvent.formatted;
    this.WorkingDaysBtwnTwoDates();
  }
  endDateOnchange(endDateEvent) {
    this.tempEndDate = endDateEvent.formatted;
    this.WorkingDaysBtwnTwoDates();
  }

  DaysOnchange(tempDay) {
    this.tempDay = $("#selectSession").val();
    this.WorkingDaysBtwnTwoDates();
  }

  gtLeavetypeForEmp() {
    this.userService.getLeavetypeForEmp(sessionStorage.getItem('emp_id')).subscribe(
      res => {
        console.log("API Success for LeavetypeForemp", res);
        this.LeavetypeForemp = res;
      },
      err => {
        console.log("API Failure for LeavetypeForemp", err.message);
      }
    );

  }

  WorkingDaysBtwnTwoDates() {

    var startDate = this.tempStartDate;
    var endDate = this.tempEndDate;
    var tempDay1 = this.tempDay;

    if (startDate > endDate) {
      alert("Todate Grater Then FromDate !!");
      return;
    }

    console.log("startDate : " + startDate + " " + "endDate : " + endDate + " " + tempDay1)


    if (tempDay1 !== "" && tempDay1 !== undefined && startDate !== "" && endDate !== "" && startDate !== undefined && endDate !== undefined) {

      if (tempDay1 == "1" || tempDay1 == "2") {
        if (startDate == endDate) {
          this.days = "0.5";
          return;
        }
        else {
          alert("please check start and end date");

          this.days = "";
          return;
        }

      }
      this.userService.getWorkingDaysBetweenTwoDates(startDate, endDate, tempDay1).subscribe(
        res => {
          console.log("API Success for Leaves", res);
          this.days = res + 1;
        },
        err => {
          console.log("API Failure for Leaves", err.message);
        }
      );

    }

  }


  onSubmit() {
    this.sDate = this.form.value.fromDate.formatted
    this.eDate = this.form.value.toDate.formatted

    $('#apply_leave').modal('show');
  }

  leavtype(event) {
    for (let i = 0; i < this.LeavetypeForemp.length; i++) {

      console.log("LeavetypeForemp" + this.LeavetypeForemp[i].lev_config_id)

      console.log("lev_config_id" + event.target.value)
      if (this.LeavetypeForemp[i].lev_config_id == event.target.value) {

        this.leave_Type = this.LeavetypeForemp[i].timeoff_type

      }
    }
  }
  reappear() {
    $('#add_leave').modal('show');

  }
  confirm() {
    console.log(this.form.value)
    console.log("@@@@@@" + this.days)

    console.log(JSON.stringify(this.form.value))
    let postData = this.form.value
    postData = {
      "emp_id": sessionStorage.getItem('emp_id'),
      "timeoff_type": this.leave_Type,
      "lev_config_id": postData.leaveType,
      "timeoff_from": postData.fromDate.formatted,  
      "timeoff_to": postData.toDate.formatted,
      "timeoff_purpose": postData.reason,
      "no_of_days": postData.no_of_days,
      "from_session": postData.selectSession,
      "status": "Pending"
    }

    this.userService.addLeaves(postData).subscribe(
      res => {
        this.errorMessage = res.text

        console.log("API Success for Leaves", res);
        this.ngOnInit();
      },
      err => {
        this.errorMessage = err.error.text
        console.log("API Failure for Leaves", err, err.error.text);
        this.ngOnInit();
      }
    );
    console.log("leave response", postData)
    this.form.reset();
  }

  addReset() {
    //this.addL = {'days':2,'status':'New'};
    $('#add_leave').modal('show');
    $('#getDisplay').modal('show');
    $('#getDisLeaveHistoryForEmpplay').modal('show');
  }

  onEdit(item) {
    this.router.navigate(['employees/leaves/edit'], { queryParams: { 'id': item.leave_id } });
  }

  onDelete(id) {
    //console.log("="+id+"=");
    //let index = this.leaves.indexOf(id);

    var index = this.rows.findIndex(function (item, i) {
      return item.leave_id === id
    });

    //console.log(index);
    if (index > -1) {
      this.rows.splice(index, 1);
      this.srch.splice(index, 1);
    }
    //console.log(this.rows);
    this.rows = this.rows;
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.LeaveHistoryForEmp(this.status, this.stdDate, this.edDate, this.page, this.pageSize);


  }

  handlePageChange(pageNo) {
    this.page = pageNo
    this.LeaveHistoryForEmp(this.status, this.stdDate, this.edDate, this.page, this.pageSize);
  }


  showReason(reason: string) {
    swal.fire({
      title: "Reason",
      html: reason,
      confirmButtonText: "Ok",
    });
  }


  searchStatus(event) {
    this.status = event
    console.log(event)
    this.LeaveHistoryForEmp(this.status, this.stdDate, this.edDate, this.page, this.pageSize);

  }

  searchfromDate(event) {

    this.stdDate = event.formatted
    console.log("Start Date ", this.stdDate);
    console.log(event)
    this.LeaveHistoryForEmp(this.status, this.stdDate, this.edDate, this.page, this.pageSize);
  }

  searchtoDate(event) {
    this.edDate = event.formatted
    console.log("To Date ", this.toDate);
    console.log(event)
    this.LeaveHistoryForEmp(this.status, this.stdDate, this.edDate, this.page, this.pageSize);

  }

  LeaveHistoryForEmp(status, stdDate, edDate, page, pageSize) {
    this.userService.getLeaveHistoryForHR(sessionStorage.getItem('emp_id'), status, this.stdDate, this.edDate, this.page, this.pageSize).subscribe(
      res => {
        this.leaveListData = res.Data;
        this.count = res.Count;

        console.log("Emp List for HR res", res);
        console.log("Employee List for HR res", this.leaveListData);
      },
      err => {
        console.log("API Failure for Employee leave history for HR");
      }
    );
  }

}