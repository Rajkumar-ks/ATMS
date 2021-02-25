import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-inputs-check',
  templateUrl: './inputs-check.component.html',
  styleUrls: ['./inputs-check.component.css']
})

export class InputsCheckComponent implements OnInit {

  public myDatePickerOptions1: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '34px',
  };
  
  clicked = false;

  punchInDate : any;
  punchInDateTime : any;
  punchOutDate : any;
  storeProductionHours : any;
  productionHours : any;
  attendanceData : any;
  logoutTime : any;
  logoutTimeHours : any;
  logoutTimeMinutes : any;
  loginTime : any;

  constructor(
    private userService : UserService,
    private router:Router
  ) {
  }

  ngOnInit() {
    this.getAttendance();
    this.loginTime = this.formatLoginAMPM()

    this.punchInDate = sessionStorage.getItem("loginDateTimestamp")
    this.punchInDateTime = sessionStorage.getItem("loginDateTime")
  }

  getAttendance(){
    this.userService.getAttendance(sessionStorage.getItem('emp_id')).subscribe(
      res => { 
        console.log("Hey getAttendance Details API Success!!", res);
        this.attendanceData = res
      },
      err => {
        console.log("getAttendance API error");
      }
    );
  }

  punchOut(){
    
    this.punchOutDate = new Date();
    this.logoutTimeHours = this.punchOutDate.getHours()
    this.logoutTimeMinutes = this.punchOutDate.getMinutes()
    this.logoutTime = this.formatAMPM()

    this.storeProductionHours = this.timeDifference(this.punchOutDate, this.punchInDateTime)

    // sessionStorage.setItem("productionHours", this.storeProductionHours);
    // this.productionHours = sessionStorage.getItem("productionHours")
    this.saveAttendance();
   
  }

  minutesDifference : any;
  hoursDifference : any;

  timeDifference(date1,date2) {
    
    var difference = date1.getTime() - date2;

    var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24

    this.hoursDifference = Math.floor(difference/1000/60/60);
    difference -= this.hoursDifference*1000*60*60

    this.minutesDifference = Math.floor(difference/1000/60);
    difference -= this.minutesDifference*1000*60

    var secondsDifference = Math.floor(difference/1000);

    if(this.minutesDifference.toString().length == 1){
      this.minutesDifference = '0' + this.minutesDifference.toString()
    }

    if(this.hoursDifference.toString().length == 1){
      this.hoursDifference = '0' + this.hoursDifference.toString()
    }

    console.log('difference = ' + 
      daysDifference + ' day/s ' + 
      this.hoursDifference + ' hour/s ' + 
      this.minutesDifference + ' minute/s ' + 
      secondsDifference + ' second/s ');

    return this.hoursDifference + ":" + this.minutesDifference
    }

    saveAttendance(){

      var outDate = {
        'emp_id': sessionStorage.getItem('emp_id'),
				'outTime': this.logoutTime,
				'hours': this.storeProductionHours,
				'Attendance_date' : this.convert(sessionStorage.getItem("loginDateTimestamp"))
      }

      console.log("Update Attendance ", outDate)
  
      this.userService.saveAttendance(outDate).subscribe(
        res => { 
          console.log("Hey Attendance Details Updated!!");
          this.ngOnInit();
        },
        err => {
          console.log("Update Attendance API error");
        }
      );
    }

    convert(Attendance_date){
        var date = new Date(Attendance_date),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-"); 
    }

    startDateChange(event){
      console.log("start date change ", event)
    }

    endDateChange(event){
      console.log("end date change ", event)
    }

    formatAMPM() {
      var hours = this.logoutTimeHours;
      var minutes = this.logoutTimeHours;
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = +minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }

    formatLoginAMPM(){
      var hours = +sessionStorage.getItem('loginDateHours');
      var minutes = sessionStorage.getItem('loginDateMinutes');
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = +minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
}
