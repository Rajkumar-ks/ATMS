import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { IMyDpOptions } from 'mydatepicker';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

export interface Entry {
  created: Date;
  id: string;
}

export interface TimeSpan {
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})

export class AttendanceListComponent implements OnInit {

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
  currentDate : any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private userService : UserService,
    private router:Router) {
  }

  entries: Entry[] = [];

  newId: string;

  private destroyed$ = new Subject();

  ngOnInit() {
    this.newId = '';
    this.addEntry();

    interval(1000).subscribe(() => {
      if (!this.changeDetector['destroyed']) {
        this.changeDetector.detectChanges();
      }
    });

    this.changeDetector.detectChanges();

    this.currentDate = Date.now()
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  
  addEntry() {
    this.entries.push({
      created: new Date(),
      id: this.newId
    });
    this.newId = '';
  }

  getElapsedTime(entry: Entry): TimeSpan {        
    let totalSeconds = Math.floor((new Date().getTime() - entry.created.getTime()) / 1000);
    
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (totalSeconds >= 3600) {
      hours = Math.floor(totalSeconds / 3600);      
      totalSeconds -= 3600 * hours;      
    }

    if (totalSeconds >= 60) {
      minutes = Math.floor(totalSeconds / 60);
      totalSeconds -= 60 * minutes;
    }

    seconds = totalSeconds;
    
    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  punchIn(){
    this.punchInDate = Date.now();
    this.saveAttendance();
  }

  loginDateTime

  saveAttendance(){
    console.log("save Attendance")
    var data = {
      'Attendance_date': '2021-02-06',
      'inTime': '09:30 AM',
      'outTime': '10:00 AM',
      'emp_id':'AS10001'
    }

    this.userService.saveAttendance(data).subscribe(
      res => { 
        console.log("Hey Attendance Details Updated!!");
      },
      err => {
        console.log("Update Attendance API error");
      }
    );
  }
}
