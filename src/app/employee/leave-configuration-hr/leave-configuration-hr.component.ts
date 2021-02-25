import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { UserService } from './../../service/user.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

import swal from 'sweetalert2/dist/sweetalert2.js';

declare const $: any;
@Component({
  selector: 'app-leave-configuration-hr',
  templateUrl: './leave-configuration-hr.component.html',
  styleUrls: ['./leave-configuration-hr.component.css']
})
export class LeaveConfigurationHrComponent implements OnInit {

  rows = [];
  public srch = [];
  leaveconfigStatus: any;

  form: FormGroup;
  editLeaveCofig: FormGroup;

  checked = false;
  res: any;
  listleave: any;
  futureleaveconfigStatus: any;
  lev_config_id: any;
  leave_Type: any;
  no_ofDays: any;
  CFStatus: any;
  stDate: any;
  edDate: any;

  public myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '28px',
    yearSelector:true,


  };
  max_CForwardDays: any;
  n: Date;
  y: any;

 





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

    this.form = this.fb.group({

      'fromDate': new FormControl(
        '', Validators.required,
      ),
      'toDate': new FormControl(
        '', Validators.required,
      ),
      leave_config: this.fb.array([this.addLeaveGroup()]),

    })

    this.editLeaveCofig = this.fb.group({

      'days': new FormControl(
        '', Validators.required,
      ),
      'cForward': new FormControl(
        '', Validators.required,
      ),
      'max_cf_days': new FormControl(
        '', Validators.required,
      ),



    })

    this.getdisplay();

    this.n =  new Date();
    this.y = this.n.getFullYear()
  }
 

  //   startDateOnchange(event: IMyDateModel) {
  //     let d: Date = new Date(event.jsdate.getTime());

  //     // set previous of selected date
  //     d.setDate(d.getDate() - 1);
  //     this.endDate = d;
  //     console.log("ghggthyhh"+this.endDate)



  // }
  // getCopyOfEndDateOptions(): IMyDpOptions {
  //   return JSON.parse(JSON.stringify(this.endDate));
  // }
  addLeaveGroup() {
    return this.fb.group({
      leaveType: ['', Validators.required],
      no_of_days: ['', Validators.required],
      carryForward: ['0', Validators.required],
      max_carry_forward_days: ['0', Validators.required],
    })
  }
  get addLeaveArray() {
    return <FormArray>this.form.get('leave_config')
  }
  addLeave() {
    this.addLeaveArray.push(this.addLeaveGroup())
  }

  removeLeave(index) {
    this.addLeaveArray.removeAt(index)
  }

  reappear() {
    $('#add_Type').modal('show');
  }

  confirm() {

    let postData = this.form.value
    console.log(postData.fromDate)
    postData.fromDate = postData.fromDate.formatted
    postData.toDate = postData.toDate.formatted
    postData.created_by = sessionStorage.getItem('emp_id')
    console.log("leave config", postData.leave_config)
    console.log("leave config => carry forward ", postData.leave_config.carryForward)
    console.log("###### submitted " + JSON.stringify(postData))

    this.userService.addLeavesType(postData).subscribe(
      res => {
        console.log("API Success for Leaves", res);
        // swal.fire({title: "Added Leave Configuration Successfully !!!", showConfirmButton: true });
        this.getdisplay();

      },
      err => {
        console.log("API Failure for Leaves", err, err.error.text);
        //  swal.fire({title: "Leave Configuration Failed !!!", showConfirmButton: true });
        this.getdisplay();


      }
    );
    this.form.reset();
  }


  addReset() {
    $('#add_Type').modal('show');
    $('#getdisplay').modal('show');
  }

  submit() {
    $('#confirmation').modal('show');
    this.listleave = this.addLeaveArray.getRawValue()
    console.log(this.listleave)
    console.log(this.listleave[0]['carryForward'])

  }

  get fromDate() {
    return this.form.get('fromDate')
  }

  get toDate() {
    return this.form.get('toDate')
  }

  get leaveType() {
    return this.form.get('leaveType')
  }
  get no_of_days() {
    return this.form.get('no_of_days')
  }
  get carryForward() {

    console.log("**************** " + this.form.get('carryForward'))
    return this.form.get('carryForward')
  }
  get max_carry_forward_days() {
    return this.form.get('max_carry_forward_days')
  }
  get days() {
    return this.form.get('days')
  }

  get cForward() {
    return this.form.get('cForward')
  }

  get max_cf_days() {
    return this.form.get('max_cf_days')
  }




  getdisplay() {
    this.userService.getleaveConfigurationStatus().subscribe(
      res => {
        this.leaveconfigStatus = res;
        console.log("Leave config List for HR res", this.leaveconfigStatus);
      },
      err => {
        console.log("API Failure for Leave config list for HR");
      }
    );
    this.userService.getfutureleaveConfigurationStatus().subscribe(
      res => {
        this.futureleaveconfigStatus = res;
        console.log("Leave config List for HR res", this.futureleaveconfigStatus);
      },
      err => {
        console.log("API Failure for Leave config list for HR");
      }
    );


  }

  delete(lev_config_id) {

    let processedData = {
      "status": "delete",
      "lev_config_id": lev_config_id

    }

    console.log("processedData : " + processedData)
    this.postData(processedData);
    this.ngOnInit();

  }


  edit(lev_config_id, lc_timeoff_type, days, carry_forward_status, max_carry_forward_days, year_st_date, year_ed_date) {
    this.ngOnInit();

    this.lev_config_id = lev_config_id,
      this.leave_Type = lc_timeoff_type,
      this.no_ofDays = days,
      this.CFStatus = carry_forward_status,
      this.max_CForwardDays = max_carry_forward_days,
      this.stDate = year_st_date,
      this.edDate = year_ed_date
    console.log("$$" + this.lev_config_id);
    console.log("$$" + this.leave_Type);


    $('#edit_Type').modal('show');

  }

  update() {


    let processedData = this.editLeaveCofig.value
    processedData = {

      "no_of_days": processedData.days,
      "carryForward": processedData.cForward,
      "max_carry_forward_days": processedData.max_cf_days,
      "lev_config_id": this.lev_config_id,
      "leaveType": this.leave_Type,
      "fromDate": this.stDate,
      "toDate": this.edDate,
      "status": "edit",
      "updt_by": sessionStorage.getItem('emp_id')
    }
    console.log("processedData" + processedData)

    this.postData(processedData);

    this.ngOnInit();


  }




  postData(processedData) {
    this.userService.updateFutureLeaveConfig(processedData).subscribe(
      res => {
        console.log("API Success for Leaves", res);
      },
      err => {
        console.log("API Failure for Leaves", err, err.error.text);
      }

    );
    console.log("leave response", processedData)

  }






  enableCarryForwardAct(index: string, isChecked: boolean) {


    var temVal = $("#carryForward" + index).val();

    if (temVal == "1") {
      $("#" + "max_carry_forward_days" + index).prop('disabled', false);
    } else {
      $("#" + "max_carry_forward_days" + index).prop('disabled', true);
      //$("#"+ "max_carry_forward_days"+index).val("0");


    }
  }

}
