import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DatePipe } from '@angular/common';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
  providers:[DatePipe]

})
export class TimesheetComponent implements OnInit {

  timesheetDetails:any;
  timesheetweekdetails=[];
  rows : any;
    constructor(private router: Router,private authService: AppService, private userService : UserService, private datePipe: DatePipe) { }
  
  
  // *************   new **********************
  week = [];
  selectedMonth : any;
  selectedWeek : any;

    ngOnInit() {
      this.authService.timesheetWeekreport().subscribe(
        res => {
          console.log(res);
          this.timesheetDetails= JSON.parse(res);
          console.log(this.timesheetDetails);
          var timesheetobjlength=(this.timesheetDetails).length
          console.log(timesheetobjlength);
          //employee Name
        
          for(var i = 0; i <timesheetobjlength; i++){
      
            console.log(this.timesheetDetails[i].emp_name)
            this.timesheetweekdetails.push({employeeName:this.timesheetDetails[i].emp_name,
              date:this.timesheetDetails[i].tsht_date,
            projectname:this.timesheetDetails[i].proj_name,
            projectcode:this.timesheetDetails[i].proj_code,
          activityname:this.timesheetDetails[i].actv_name,
          assignedhours:this.timesheetDetails[i].actv_hrs,
          hours:this.timesheetDetails[i].hours,
          description:this.timesheetDetails[i].remarks,
          rejectionremarks:this.timesheetDetails[i].rejt_remarks,
          status:this.timesheetDetails[i].status
        })
          }
        });
  
  // ********************************** new code initiat *************************************************
  
  
  
    }
   
  
  public rejectEdit(employee){
  console.log(employee.status)
  if(employee.status=="Rejected"){
    var dateFormat=this.datePipe.transform(employee.date, 'yyyy-MM-dd');
    console.log(dateFormat)
    dateFormat.split("-");
    var yyyy = dateFormat.split("-")[0];
   var mm=dateFormat.split("-")[1];
   var dt =dateFormat.split("-")[2];
   console.log("Date:" +dt);
    this.router.navigate(['timesheet'],{ queryParams: { 'date': dt,'month':mm,'year':yyyy }  });
  }
  }
  
  
  
  // ********************************** new code  *************************************************
  
  public onMonthSelected(event) {
    this.week = [];
    const tempSelectedMonth = event.target.value;
    this.selectedMonth      = tempSelectedMonth.toString();
    const currentYear       = (new Date()).getFullYear();
      console.log("seelcted month ::::::::::::::; "+ tempSelectedMonth);
      console.log("currentYear year ::::::::::::::; "+ currentYear);
  
  
      this.authService.getWeek(tempSelectedMonth, currentYear.toString()).subscribe(
        (res: any) => {

          var obj = JSON.parse(res);
        let count = obj.length;
        var weekday = [];

        for (var i = 0; i < count; i++) {
         
          weekday = obj[i];
          var weeklength = Object.keys(weekday).length;

          var dayobjstdatestr = JSON.stringify(weekday[0]);
          let startMonth = JSON.parse(dayobjstdatestr);
        
          var dayobjeddatestr = JSON.stringify(weekday[6]);
          let endMonth = JSON.parse(dayobjeddatestr);
  
            //push Week 1 date and last date 
            this.week.push({ weekname: ("Week" + " " + (i + 1) + "(" + startMonth.Date + "-" + endMonth.Date + ")"), weekvalue: startMonth.Date + "-" + endMonth.Date });
          
  
  
          }
  
        })
  }
  
  public onWeekSelected(event) {
    this.selectedWeek = event.target.value;
  }
  
  public showTimeSheetPage()
  {

      var month    = this.selectedMonth;
      var weekdays = this.selectedWeek;

      if(weekdays == undefined || weekdays == "undefined")
      {
        swal.fire({ title: "Please Select the Week!!", showConfirmButton: true })
        return;
      }
      if(month == undefined || month == "undefined")
      {
        swal.fire({ title: "Please Select The Month!!", showConfirmButton: true })
        return;
      }

      this.router.navigate(['timesheet-content'], { queryParams: { 'month': this.selectedMonth , 'week' : this.selectedWeek} });


  }

}
