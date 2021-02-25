import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-timesheetweek-status',
  templateUrl: './timesheetweek-status.component.html',
  styleUrls: ['./timesheetweek-status.component.css'],
  providers: [DatePipe]
})
export class TimesheetweekStatusComponent implements OnInit {
timesheetDetails:any;
timesheetweekdetails=[];
rows : any;
  constructor(private router: Router,private authService: AppService,private datePipe: DatePipe) { }

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
  }
 
public addTimesheet(){
  this.router.navigate(['timing-sheet']);
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
  this.router.navigate(['timing-sheet'],{ queryParams: { 'date': dt,'month':mm,'year':yyyy }  });
}
}
}
