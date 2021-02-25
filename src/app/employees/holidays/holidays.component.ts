import { UserService } from './../../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

declare const $: any;

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  form: FormGroup;
  editHoliday: FormGroup;
  res: any;
  holidaysListDisplay: any;
  holidayList: any;
  futureHolidaysList: any;


  public myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '38px'
  };
  n: Date;
  y: any;

  rows = [];

  public srch = [];
  public addL: any = {};
  errorMessage: any;
  edtholiday_id: any;
  edtholidayName: any;
  edtholidayDate: object;
  currentMonth: any;
  currentDate: any;
  currentYear: any;
  new_date: object;

  constructor(private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService) {
    this.rows = appService.leaves;
    this.srch = [...this.rows];

  }
  ngOnInit() {

    this.form = this.fb.group({
      holiday_list: this.fb.array([this.addHolidayGroup()]),
    })

    this.editHoliday = this.fb.group({
      'etholidayName': new FormControl(
        '', Validators.required,
      ),
      'etholidayDate': new FormControl(
        '', Validators.required,
      ),



    })

    this.getdisplay();
    this.n =  new Date();
    this.y = this.n.getFullYear()

  }

  addHolidayGroup() {
    return this.fb.group({
      holidayName: ['', Validators.required],
      holidayDate: ['', Validators.required]
    })
  }



  get addHolidayArray() {
    return <FormArray>this.form.get('holiday_list')
  }

  addHoliday() {
    this.addHolidayArray.push(this.addHolidayGroup())
  }

  removeHoliday(index) {
    this.addHolidayArray.removeAt(index)
  }

  get holidayName() {
    return this.form.get('holidayName')
  }

  get holidayDate() {
    return this.form.get('holidayDate')
  }

  get etholidayName() {
    return this.form.get('etholidayName')
  }

  get etholidayDate() {
    return this.form.get('etholidayDate')
  }

  addReset() {
    $('#add_Type').modal('show');
  }

  onConfirm() {
    $('#apply_Holiday').modal('show');

  }

  reappear() {
    $('#add_Type').modal('show');

  }

  onSubmit() {
    let postData = this.form.value
    postData.creatorId = sessionStorage.getItem('emp_id')

    for (var i = 0; i < postData.holiday_list.length; i++) {
      console.log("holiday date l", postData.holiday_list[i].holidayDate.formatted)
      postData.holiday_list[i].holidayDate = postData.holiday_list[i].holidayDate.formatted
    }

    console.log("submitted " + JSON.stringify(postData))

    this.userService.addHolidays(postData).subscribe(
      res => {

        console.log("API Success for Leaves", res);
        this.ngOnInit();
      },
      err => {
        console.log("API Failure for Leaves", err, err.error.text);
        this.ngOnInit();
      }
    );
    console.log("leave response", postData)

  }
  getdisplay() {
    this.userService.getHolidayList().subscribe(
      res => {
        this.holidaysListDisplay = res;
        console.log("Leave config List for HR res", this.holidaysListDisplay);
      },
      err => {
        console.log("API Failure for Leave config list for HR");
      }
    );

    this.userService.getfutureHolidayList().subscribe(
      res => {
        this.futureHolidaysList = res;
        console.log("Leave config List for HR res", this.futureHolidaysList);
      },
      err => {
        console.log("API Failure for Leave config list for HR");
      }
    );
  }


  edit(holiday_id, holidayName, holidayDate) {
    this.edtholiday_id = holiday_id;
    this.edtholidayName = holidayName;
    this.edtholidayDate = this.getDate(holidayDate);
    console.log("#$#" + holidayDate)
    $('#edit_Holiday').modal('show');


  }


  update() {


    let processedData = this.editHoliday.value
    console.log("etholiday" +JSON.stringify(this.editHoliday.value));

    processedData = {

      
      "holidayDate": processedData.etholidayDate.formatted,
      "holidayName": processedData.etholidayName,
      "holiday_id": this.edtholiday_id,
      "update_by":sessionStorage.getItem('emp_id'),
      "status":"edit"


    }
    console.log("processedData" + processedData)

    this.postData(processedData);

    this.ngOnInit();


  }
  delete(holiday_id) {

    let processedData = {
      "status": "delete",
      "holiday_id": holiday_id

    }

    console.log("processedData : " + processedData)
    this.postData(processedData);
    this.ngOnInit();

  }
  postData(processedData) {
    this.userService.editHoliday(processedData).subscribe(
      res => {
        console.log("API Success for Leaves", res);
      },
      err => {
        console.log("API Failure for Leaves", err, err.error.text);
      }

    );
    console.log("leave response", processedData)
    this.ngOnInit();

  }


  getDate(date) {
    if (date === '') {
      date = ''
    } else {
      let new_date = date
      let datePass = new Date(new_date).toLocaleDateString()
      this.res = datePass.split("/");
      for (var i = 0; i < this.res.length; i++) {
        this.currentMonth = this.res[0]
        this.currentDate = this.res[1]
        this.currentYear = this.res[2]
      }
      this.new_date = { date: { year: this.currentYear, month: this.currentMonth, day: this.currentDate } };
      return this.new_date;
    }
  }

 

}
