import { Component, OnInit, ViewChild} from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
// import * as uuid from 'uuid';
import swal from 'sweetalert2/dist/sweetalert2.js';
import { DatePipe } from '@angular/common';
// import { MatTabChangeEvent } from '@angular/material';

declare const $: any;

@Component({
  selector: 'app-timingsheet',
  templateUrl: './timingsheet.component.html',
  styleUrls: ['./timingsheet.component.css'],
  providers: [DatePipe]
})

export class TimingsheetComponent implements OnInit {
  selectActvIdsList = [];
  years: any = [];
  yy: any;
  monthselected: any;
  yearselected: any;
  form: FormGroup;
  Monthflag: boolean;
  Yearflag: boolean;
  private mm: any;
  private val: string;
  private name: string;
  size: any;
  count: any;
  week = [];
  obj: any;
  weekValue: any;
  tabs = [];
  weekday:any = [];
  weekval: any;
  projectJson: any;
  activityListJson: any;
  projectObjectCount: any;
  activityListCount: any;
  projectList: any = [];
  activityList: any = [];
  projectOnClickCount = 0;
  activitylistOnCickCount = 0;
  Projectselected: any;
  Activityselected: any;
  linkSelected: any;
  isExpanded = false;
  public tshtprojectlist: any = [];
  public tshtactivitylist: any = [];
  newtshtlist: any = [];
  updatetshtlist: any = [];
  buttonCaption = "Expand";
  addSheetValidation: boolean = false;
  date = new Date();
  curr_date = this.date.getDate();
  curr_month = this.date.getMonth() + 1;
  curr_year = this.date.getFullYear();
  dateToday = this.curr_date + '-' + this.curr_month + '-' + this.curr_year;
  activeLink: any;
  intTabValue: any;
  public addS: any = [];
  public links: any = [];
  disable = false;
  wkstartday: any;
  wkendday: any;
  description: any;
  isNewtsht = true;
  isExttsht = true;
  latest_Date: any
  currentYear: any
  currentMonth: any
  currentDate: any
  display = false;
  temHour: any = null;
  pubdayobj: any;
  selectedactvval = "";
  Month:any;
  Week:any;
  weekname:any;
  dateid;
  rejecteddateFormat;
  timesheetSubCheck=false;
  // conditionCount:number;
  // copyweek=[];
  // copyweekname:any;
  //Constructor
  constructor(private fb: FormBuilder, private datePipe: DatePipe, private AppService: AppService, 
    private authService: AppService, private route: ActivatedRoute, private router: Router) {
    this.form = fb.group({
      month: ['', [Validators.required]],
      Week:['', [Validators.required]]
    },
    )
    
    //Restrict the Character at Input Hour
    // $(document).on('keypress', 'input[type="text"]', function (e) {
      $(document).on('keypress', 'input[class="tsht_hour_field"]', function (e) {
        var element = this;
      // return (((e.which > 47) && (e.which < 58)) || (e.which == 13));

      var charCode;
      if (e.keyCode > 0) {
        charCode = e.which || e.keyCode;
        insertTimingColor(element,charCode)
      }
      else if (typeof (e.charCode) != "undefined") {
        charCode = e.which || e.keyCode;
        insertTimingColor(element,charCode)
      }
      if (charCode == 58)
        return true
      if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
      return true;
      
    });
    function insertTimingColor(element,key){
      var inputValue = element.value;
      if(element.value.trim().length == 2 && key !== 8){
          element.value = element.value + ':';
      }
  }
    //Validate HH:MM for input 
    $(document).on('change', 'input[class="tsht_hour_field"]', function (event) {
      var value = event.target.value
      var hours = value.split(":")[0];
        // hours=JSON.stringify(hours)
        var mins=value.split(":")[1];
        console.log("hours==="+hours+"Minutes===="+mins+typeof(hours)+typeof(mins))
        if(hours==0 && mins < 30){
          swal.fire({ title: "Please enter the input minimum of 30 minutes", showConfirmButton: true }).then(result => {
            if (result.value) {

            } else {

            }
          })
        }
      // var isValid = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
      var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(value);
     
      if (!isValid) {

        swal.fire({ title: "Please enter the input in HH:MM format", showConfirmButton: true }).then(result => {
          if (result.value) {

          } else {

          }
        })
      }
    });

    // $('div').on('click', '.textfield', function () {
    //   var hiddenValid = $(this).closest('tr').find('input[type=hidden]').val(); // get table id

    //   var $tr = $(this).closest('table tr');
    //   var tot = 0; // variable to sore sum
    //   $('input', $tr).each(function () { // iterate over inputs
    //     //  debugger
    //     tot += Number($(this).val()) || 0; // parse and add value, if NaN then add 0
    //   });
    //   $('#totalhours_' + hiddenValid).text(tot);
    // });
    }
    //constructor Completed
  months = [

    { val: '01', name: 'Jan' },
    { val: '02', name: 'Feb' },
    { val: '03', name: 'Mar' },
    { val: '04', name: 'Apr' },
    { val: '05', name: 'May' },
    { val: '06', name: 'Jun' },
    { val: '07', name: 'Jul' },
    { val: '08', name: 'Aug' },
    { val: '09', name: 'Sep' },
    { val: '10', name: 'Oct' },
    { val: '11', name: 'Nov' },
    { val: '12', name: 'Dec' }
  ];



//Month selected

  public onMonthSelected(event) {

    const value = event.target.value;
    this.monthselected = value;
  
    console.log(this.monthselected);
    this.Monthflag = true;
    if (this.Monthflag == true) {
      this.date = new Date();
      //current date
      this.latest_Date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
      this.latest_Date.split("-");
      this.currentYear = this.latest_Date.split("-")[0];
      this.currentMonth = this.latest_Date.split("-")[1];
      this.currentDate = this.latest_Date.split("-")[2];
      this.monthselected= this.monthselected.split(":")[0];
      console.log("Month Selected ", this.monthselected)
      if( this.monthselected.length==1){
        this.monthselected="0" +this.monthselected
      }
      else{
        this.monthselected=this.monthselected;
      }

      console.log(this.monthselected+"****MonthSelected***")
      this.authService.getWeek(this.monthselected, this.currentYear).subscribe(
        (res: any) => {
          this.obj = JSON.parse(res);
          console.log(this.obj);
          this.count = this.obj.length;
          console.log(this.count);
          this.week = [];
          for (var i = 0; i < this.count; i++) {
           
            this.weekday = this.obj[i];
            var weeklength = Object.keys(this.weekday).length;

            var dayobjstdatestr = JSON.stringify(this.weekday[0]);
            let dayobjstdate = JSON.parse(dayobjstdatestr);
            console.log(dayobjstdate.Date);

            var dayobjeddatestr = JSON.stringify(this.weekday[6]);
            let dayobjeddate = JSON.parse(dayobjeddatestr);
            console.log(dayobjeddate.Date);

            //push Week 1 date and last date 
            this.week.push({ weekname: ("Week" + " " + (i + 1) + "(" + dayobjstdate.Date + "-" + dayobjeddate.Date + ")"), weekvalue: i });
            for (var j = 0; j < this.weekday.length; j++) {


            }


          }

        })
    }
  }

  //Not used
  //Year  & api call 
  public onYearSelected(event) {
    const value = event.target.value;
    this.yearselected = value;
    console.log(this.yearselected);
    this.Yearflag = true;
    if (this.Monthflag == true && this.Yearflag == true) {
      this.authService.getWeek(this.monthselected, this.yearselected).subscribe(
        (res: any) => {
          //length of json array
          this.obj = JSON.parse(res);
          console.log(this.obj);
          this.count = this.obj.length;
          console.log(this.count);
          this.week = [];
          for (var i = 0; i < this.count; i++) {
            this.weekday = this.obj[i];
            var weeklength = Object.keys(this.weekday).length;

            var dayobjstdatestr = JSON.stringify(this.weekday[0]);
            let dayobjstdate = JSON.parse(dayobjstdatestr);
            console.log(dayobjstdate.Date);

            var dayobjeddatestr = JSON.stringify(this.weekday[6]);
            let dayobjeddate = JSON.parse(dayobjeddatestr);
            console.log(dayobjeddate.Date);

            this.week.push({ weekname: ("Week" + " " + (i + 1) + "(" + dayobjstdate.Date + "-" + dayobjeddate.Date + ")"), weekvalue: i });
            for (var j = 0; j < this.weekday.length; j++) {


            }


          }
        })
    }
  }

  //add button for activtiy //kishor

  public addTimesheetUI(id, ddelementid, loadactivities, tempactvstatus, projindx) {


    //   const id = $(this).attr("id");
    //   const tempId = id.replace('add_', '');
    //  var hiddenValid = $(this).closest('tr').find('input[type=hidden]').val(); // get table id
    this.appendProjectActivityRow(id, ddelementid, loadactivities, tempactvstatus, projindx);
    $('#add_' + ddelementid).hide(); //hide add btn
    $('#minus_' + ddelementid).show(); //show delete btn
  }

  public appendProjectActivityRow(id, ddelementid, loadactivities, tempactvstatus, projindx) {


    if (loadactivities.length == this.selectActvIdsList[projindx].length) {
      return;
    }

    var elemntid = ddelementid.split("_")[1];
    console.log("elemntid========================" + elemntid);
    var elemntstr = elemntid.substring(2, elemntid.length);
    console.log("elemntstr=========================" + elemntstr);
    var ids = Number(elemntstr)
    var myId = ddelementid.split("_")[0] + "_dd" + (ids + 1);
    console.log("myId=========================" + myId);
    var options = [];
    options.push('<option value="" > Select Activity </option>');
    loadactivities.forEach(function (value) {
      console.log(value);
      var op = '<option value="' + value.activ_id + '" > ' + value.activ_name + ' </option>';
      options.push(op);

    })
    // for(var i=0 ;i< wrkactiv.Loadactivities.length,i++){
    //   <option value="{{act.activ_id}}" >
    //   {{act.activ_name}} </option>
    // }
    var y = "<tr id =row_" + myId + "><td>"
      + "<span class='br' style='display: block;margin-bottom:0.4em;'></span><select class='activity' name='activity' id=" + myId + "  required style='display:inline-block; padding:2px;width:17%'>"
      + options
      + "</select><style>input[type=text]{text-align:center;border:1px solid black; }input:focus {text-align:center ;border:2px solid green; }</style>"
      + "<input class='tsht_hour_field' type='text' autocomplete='off' placeholder='00:00' name='hours1' style='margin-left:1%;width:10%;' >"
      + "<input class='tsht_hour_field' type='text' autocomplete='off' placeholder='00:00' name='hours2' style='display:inline-block; margin-left:1%;width:10%; ' >"
      + "<input class='tsht_hour_field' type='text' autocomplete='off' placeholder='00:00' name='hours3' style='display:inline-block; margin-left:1%;width:10%;' >"
      + "<input class='tsht_hour_field' type='text' autocomplete='off' placeholder='00:00' name='hours4' style='display:inline-block; margin-left:1%;width:10%; ' >"
      + "<input class='tsht_hour_field' type='text' autocomplete='off' placeholder='00:00' name='hours5' style='display:inline-block; margin-left:1%;width:10%;' >"
      + "<input class='tsht_hour_field' type='text' autocomplete='off' placeholder='00:00' name='hours6' style='display:inline-block; margin-left:1%;width:10%;' >"
      + "<input class='tsht_hour_field' type='text' autocomplete='off' placeholder='00:00' name='hours7' style='display:inline-block; margin-left:1%;width:10%;' >"
      + "<button class='add fa fa-plus' id=add_" + myId + " style='margin-left:2%;'>"
      + "</button>"
      + "<button class='minus fa fa-minus' id=minus_" + myId + " style='margin-left:2%;display:none;'>"
      + "</button>"
      + "<input type='hidden' id='custId' name='custId' value=" + id + ">"
      + "</td></tr>"



    console.log(y);
    $('#' + "table_" + id).append(y);
    // this.addSelectBoxList(myId);
    //(ngModelChange)='timeField_Changes($event,workactiveobj.Activity?.day1,workactiveobj?.ddelementid,1)';
    console.log($('#row_' + myId + " input[type=text]"));
    var test = $('#row_' + myId + " input[type=text]");
    console.log($('#row_' + myId + " input[type=text]")[0]);
    test[0].addEventListener('change', (evt) => this.timeField_Changes(evt, null, myId, 1, null));
    test[1].addEventListener('change', (evt) => this.timeField_Changes(evt, null, myId, 2, null));
    test[2].addEventListener('change', (evt) => this.timeField_Changes(evt, null, myId, 3, null));
    test[3].addEventListener('change', (evt) => this.timeField_Changes(evt, null, myId, 4, null));
    test[4].addEventListener('change', (evt) => this.timeField_Changes(evt, null, myId, 5, null));
    test[5].addEventListener('change', (evt) => this.timeField_Changes(evt, null, myId, 6, null));
    test[6].addEventListener('change', (evt) => this.timeField_Changes(evt, null, myId, 7, null));
    //click
    test[0].addEventListener('click', (evt) => this.timeField_Click(evt, null, myId, 1));
    test[1].addEventListener('click', (evt) => this.timeField_Click(evt, null, myId, 2));
    test[2].addEventListener('click', (evt) => this.timeField_Click(evt, null, myId, 3));
    test[3].addEventListener('click', (evt) => this.timeField_Click(evt, null, myId, 4));
    test[4].addEventListener('click', (evt) => this.timeField_Click(evt, null, myId, 5));
    test[5].addEventListener('click', (evt) => this.timeField_Click(evt, null, myId, 6));
    test[6].addEventListener('click', (evt) => this.timeField_Click(evt, null, myId, 7));

    //blur
    test[0].addEventListener('blur', (evt) => this.onBlurMethod(evt));
    test[1].addEventListener('blur', (evt) => this.onBlurMethod(evt));
    test[2].addEventListener('blur', (evt) => this.onBlurMethod(evt));
    test[3].addEventListener('blur', (evt) => this.onBlurMethod(evt));
    test[4].addEventListener('blur', (evt) => this.onBlurMethod(evt));
    test[5].addEventListener('blur', (evt) => this.onBlurMethod(evt));
    test[6].addEventListener('blur', (evt) => this.onBlurMethod(evt));
    var addbtn = $('#row_' + myId + ' #add_' + myId);
    addbtn[0].addEventListener('click', (evt) => this.addTimesheetUI(id, myId, loadactivities, null, projindx));

    var removebtn = $('#row_' + myId + ' #minus_' + myId);
    removebtn[0].addEventListener('click', (evt) => this.removeTimesheetUI(myId, null));


    var activitySelect = $('#row_' + myId + " select");
    activitySelect[0].addEventListener('click', (evt) => this.activityclick(evt));
    activitySelect[0].addEventListener('change', (evt) => this.activitychange(evt, projindx));


   
    var CurrentDate = new Date(this.latest_Date)

    for (var j = 0; j < this.weekday.length; j++) {

      var dayobjstdatestr = JSON.stringify(this.weekday[j]);
      let dayobjstdate = JSON.parse(dayobjstdatestr);


      var addstday = dayobjstdate.Date;
      var strmonth = addstday.split(" ")[0];
      addstday = addstday.split(" ")[1];
      strmonth = strmonth.trim();
      var dstdatemonth = strmonth == "JAN" ? "01" : strmonth == "FEB" ? "02" : strmonth == "MAR" ? "03" : strmonth == "APR" ? "04" :
        strmonth == "MAY" ? "05" : strmonth == "JUN" ? "06" : strmonth == "JUL" ? "07" : strmonth == "AUG" ? "08" :
          strmonth == "SEP" ? "09" : strmonth == "OCT" ? "10" : strmonth == "NOV" ? "11" : strmonth == "DEC" ? "12" : "";
      if (addstday.length == 1) {
        addstday = "0" + addstday;
      }

      var stdate =this.currentYear+ "-" + dstdatemonth + "-" + addstday;

      var StartDate = new Date(stdate);
      if (StartDate > CurrentDate) {
        console.log("============== Checked")

        var inputname = j + 1;
        var ipId = "hours" + inputname;
        console.log(ipId);

        console.log(" ================== document loaded", $('input[name=' + ipId + ']'));
        $('input[name=' + ipId + ']').attr("disabled", "disabled");

      }
    }
  }





  public removeTimesheetUI(ddelementid, wrkactiv) {
    swal.fire({ title: "Do You Want to Remove", showConfirmButton: true, showCancelButton: true })
      .then(result => {
        if (result.value) {
          if (wrkactiv != null) {
            console.log("wrkactiv -========", wrkactiv);

            let timesheetID: any = [];
            (wrkactiv.Activity.day1) ? timesheetID.push(wrkactiv.Activity.day1.tsht_id) : '';
            (wrkactiv.Activity.day2) ? timesheetID.push(wrkactiv.Activity.day2.tsht_id) : '';
            (wrkactiv.Activity.day3) ? timesheetID.push(wrkactiv.Activity.day3.tsht_id) : '';
            (wrkactiv.Activity.day4) ? timesheetID.push(wrkactiv.Activity.day4.tsht_id) : '';
            (wrkactiv.Activity.day5) ? timesheetID.push(wrkactiv.Activity.day5.tsht_id) : '';
            (wrkactiv.Activity.day6) ? timesheetID.push(wrkactiv.Activity.day6.tsht_id) : '';
            (wrkactiv.Activity.day7) ? timesheetID.push(wrkactiv.Activity.day7.tsht_id) : '';

            console.log("timesheetID::::: " + timesheetID);
            this.authService.deleteTshtIds(timesheetID).subscribe(
              (res: any) => {

              });



          }
          var rowid = 'row_' + ddelementid.trim();
          console.log("myId=========================" + rowid);
          $('#' + rowid).remove();

        }
      })
  }


  public onProjectSelected(event) {
    const value = event.target.value;
    this.Projectselected = value;
    console.log(this.Projectselected);
    this.projectOnClickCount++;
    if (this.projectOnClickCount == 1) {
      this.authService.getProjectList().subscribe(
        (res: any) => {
          this.projectJson = JSON.parse(res);
          this.projectObjectCount = Object.keys(this.projectJson).length;
          console.log("The project list object length is" + this.projectObjectCount);
          for (var i = 0; i < this.projectObjectCount; i++) {
            console.log(this.projectJson[i].proj_name);
            this.projectList.push({ projectname: this.projectJson[i].proj_name, projectcode: this.projectJson[i].proj_code });
          }
        })
    }
  }
  public onActivitySelected(event) {
    const value = event.target.value;
    this.Activityselected = value;
    console.log(this.Activityselected);
    this.activitylistOnCickCount++
    if (this.activitylistOnCickCount == 1) {
      this.authService.getActivityList(this.currentYear, this.monthselected, this.intTabValue).subscribe(
        (res: any) => {
          console.log(res);
          this.activityListJson = JSON.parse(res);
          this.activityListCount = Object.keys(this.activityListJson).length;
          console.log("The Activity list object length is" + this.activityListCount);
          for (var i = 0; i < this.activityListCount; i++) {
            console.log(this.activityListJson[i].activityName);
            this.activityList.push({ activityname: this.activityListJson[i].activityName, activityid: this.activityListJson[i].activityId });

          }
        })
    }
  }

  //kishor
  public activityclick(event) {
    this.selectedactvval = event.target.value;
  }

  //kishor
  public activitychange(event, indx) {
    console.log("this.selectActvIdsList[indx]", this.selectActvIdsList[indx]);
    if (this.selectActvIdsList[indx] && this.selectActvIdsList[indx].includes(event.target.value)) {
      console.log("IF    this.selectActvIdsList[indx]", this.selectActvIdsList[indx]);
      event.target.value = this.selectedactvval;
    } else {

      this.selectActvIdsList[indx].push(event.target.value);
      console.log("ELSE   this.selectActvIdsList[indx]", event.target.value);

    }


  }
// public  defaultMonth(){
//   this.date = new Date();
//   this.latest_Date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
//   this.latest_Date.split("-");
//   this.currentYear = this.latest_Date.split("-")[0];
//   this.currentMonth = this.latest_Date.split("-")[1];
//   this.currentDate = this.latest_Date.split("-")[2];
// this.authService.getWeek(this.currentMonth,this.currentYear).subscribe(
//   (res: any) => {
//     this.obj = JSON.parse(res);
//     console.log(this.obj);
//     this.count = this.obj.length;
//     console.log(this.count);
//     this.week = [];
//     for (var i = 0; i < this.count; i++) {
//       this.weekday = this.obj[i];
//       var weeklength = Object.keys(this.weekday).length;

//       var dayobjstdatestr = JSON.stringify(this.weekday[0]);
//       let dayobjstdate = JSON.parse(dayobjstdatestr);
//       console.log(dayobjstdate.Date);

//       var dayobjeddatestr = JSON.stringify(this.weekday[6]);
//       let dayobjeddate = JSON.parse(dayobjeddatestr);
//       console.log(dayobjeddate.Date);
//       this.week.push({ weekname: ("Week" + " " + (i + 1) + "(" + dayobjstdate.Date + "-" + dayobjeddate.Date + ")"), weekvalue: i });
//       for (var j = 0; j < this.weekday.length; j++) {


//       }


//     }

//   })
// }
  ngOnInit() {
    //console.log(this.date);
    this.getYear();
    this.getMonth();
    //Query
    // this.date = new Date();
    //   this.latest_Date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    //   this.latest_Date.split("-");
    //   this.currentYear = this.latest_Date.split("-")[0];
    //   this.currentMonth = this.latest_Date.split("-")[1];
    //   this.currentDate = this.latest_Date.split("-")[2];
    // this.Month=this.currentMonth
    console.log(this.currentMonth+"--------------------")
    this.route.queryParamMap.subscribe(
      queryParams => {
      var dt=queryParams.get('date');
      var mm=queryParams.get('month');
      var yyyy=queryParams.get('year');
      this.Month=mm
      this.rejecteddateFormat=yyyy+"-"+mm+"-"+dt
      console.log("*************"+ queryParams.get('date'));
      var dateForm=dt.replace(/^0+/, '')
      console.log("*************"+ queryParams.get('month'));
      this.authService.getWeek(mm, yyyy).subscribe(
        (res: any) => {
         
          if (mm === '01') var monthName='JAN';
          if (mm === '02') var monthName='FEB';
          if (mm === '03') var monthName='MAR';
          if (mm === '04') var monthName='Apr';
          if (mm === '05') var monthName='MAY';
          if (mm === '06') var monthName='JUN';
          if (mm === '07') var monthName='JUL';
          if (mm === '08') var monthName='AUG';
          if (mm === '09') var monthName='SEP';
          if (mm === '10') var monthName='OCT';
          if (mm === '11') var monthName='NOV';
          if (mm === '12') var monthName='DEC';
          console.log(monthName+"*********monthname**********");
          this.obj = JSON.parse(res);
          this.count = this.obj.length;
          console.log(this.count);
         
          this.timesheetSubCheck=true;
            
          this.display = true
          
            var rejectdate=monthName+" "+dateForm
            console.log(rejectdate+"*******rejectdate*******")
  
            
            for (var i= 0; i < this.count; i++) {
              
              this.weekday = this.obj[i];
              var weeklength = Object.keys(this.weekday).length;
              var dayobjstdatest = JSON.stringify(this.weekday[0]);
              let dayobjstdat = JSON.parse(dayobjstdatest);
              console.log(dayobjstdat.Date);
              var dayobjeddatest = JSON.stringify(this.weekday[6]);
              let dayobjeddat = JSON.parse(dayobjeddatest);
              this.week.push({ weekname: ("Week" + " " + (i + 1) + "(" + dayobjstdat.Date + "-" + dayobjeddat.Date + ")"), weekvalue: i });

            
           
            var objarr = [];
            for (var j = 0; j < weeklength; j++) {
              var dayobjstdatestr = JSON.stringify(this.weekday[j]);
              let dayobjstdate = JSON.parse(dayobjstdatestr);
              objarr.push(dayobjstdate.Date)
              this.tabs = objarr;
              console.log(this.tabs[j]);
               
              if( rejectdate==this.tabs[j]){
                this.dateid=j+1;
                console.log(this.dateid+"***id")
                console.log("the rejected date is"+rejectdate)
                var weekval=i;
                this.Week=i;
                console.log(weekval+"**************weekvaue")
              }}}
                          
    this.date = new Date();
    this.latest_Date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.latest_Date.split("-");
    this.currentYear = this.latest_Date.split("-")[0];
    this.currentMonth = this.latest_Date.split("-")[1];
    this.currentDate = this.latest_Date.split("-")[2];
    this.links = [];
    this.tabs = [];
    const value =weekval
    this.weekValue =value;
    console.log("valueof week is" + this.weekValue);
    this.weekday = this.obj[this.weekValue];
    var weeklen = this.weekday.length;
    var objarr = [];
    objarr.push("Projects")
    var stday = "0";
    var edday = "0";
    var stdatemonth = this.Month;
    var eddatemonth = this.Month;
    for (var j = 0; j < this.weekday.length; j++) {

      var dayobjstdatestr = JSON.stringify(this.weekday[j]);
      let dayobjstdate = JSON.parse(dayobjstdatestr);
      console.log(dayobjstdate.Date);
      objarr.push(dayobjstdate.Date)

      if (j == 0) {
        stday = dayobjstdate.Date;
        var strmonth = stday.split(" ")[0];
        stday = stday.split(" ")[1];
        strmonth = strmonth.trim();
        stdatemonth = strmonth == "JAN" ? "01" : strmonth == "FEB" ? "02" : strmonth == "MAR" ? "03" : strmonth == "APR" ? "04" :
          strmonth == "MAY" ? "05" : strmonth == "JUN" ? "06" : strmonth == "JUL" ? "07" : strmonth == "AUG" ? "08" :
            strmonth == "SEP" ? "09" : strmonth == "OCT" ? "10" : strmonth == "NOV" ? "11" : strmonth == "DEC" ? "12" : "";


        //  console.log("*********************************** "+this.getInputMonthFromStr(strmonth));
        if (stday.length == 1) {
          stday = "0" + stday;
        }
      } else if (j == 6) {
        edday = dayobjstdate.Date;
        var strmonth = edday.split(" ")[0];
        eddatemonth = strmonth == "JAN" ? "01" : strmonth == "FEB" ? "02" : strmonth == "MAR" ? "03" : strmonth == "APR" ? "04" :
          strmonth == "MAY" ? "05" : strmonth == "JUN" ? "06" : strmonth == "JUL" ? "07" : strmonth == "AUG" ? "08" :
            strmonth == "SEP" ? "09" : strmonth == "OCT" ? "10" : strmonth == "NOV" ? "11" : strmonth == "DEC" ? "12" : "";
        edday = edday.split(" ")[1];
        if (edday.length == 1) {
          edday = "0" + edday;
        }
      }
    }
    this.tabs = objarr;
    //getting length of JSON object from the JSON array
    var len = Object.keys(this.tabs).length;
    for (var i = 0; i <= len; i++) {
      this.links.push(this.tabs[i]);
    }

    var rejectedstartyear; var rejectendyear;
    
    if(stdatemonth=="12" && eddatemonth=="12"){
      rejectedstartyear=yyyy;
      rejectendyear=yyyy;
      }
      
      else if(stdatemonth=="12" && eddatemonth==mm){
      rejectedstartyear=Number(yyyy)
      rejectedstartyear=rejectedstartyear-1
      rejectendyear=yyyy;
      }
      else if(stdatemonth=="12" && eddatemonth!=mm){
      rejectendyear=Number(yyyy)
      rejectendyear=rejectendyear+1
      rejectedstartyear=yyyy
      }
      else{
      rejectedstartyear=yyyy;
      rejectendyear=yyyy;
      }
    var stdate =rejectedstartyear+ "-" + stdatemonth + "-" + stday;
    var eddate = rejectendyear+"-" + eddatemonth + "-" + edday;

    this.wkstartday = stdate;
    this.wkendday = eddate;
    var StartDate = new Date(stdate)
    var EndDate = new Date(eddate)
    var CurrentDate = new Date(this.latest_Date)
    
    this.authService.getTimesheetDetails(sessionStorage.getItem("emp_id"), stdate, eddate).subscribe(
      (res: any) => {
        let allprojDetailsjobj = JSON.parse(res);
        this.tshtprojectlist = allprojDetailsjobj;

        for (var i = 0; i < this.tshtprojectlist.length; i++){
          let proj = this.tshtprojectlist[i];
          let tempproj: any;
          var projcodeval = proj.ProjectCode;
          var actvval = proj.ActivityNames;
          tempproj = {
            projcodeval: actvval
          }
          let DayofDetails: any = [];
          let DayofDetail: any = [];
          DayofDetail = proj.DayofDetail;
          for (var j = 0; j < DayofDetail.length; j++) {
            let tempprojs: any;
            tempprojs = DayofDetail[j];
            if (tempprojs.SelectedActivity) {
              DayofDetails.push(tempprojs.SelectedActivity);
            }


          }
          this.selectActvIdsList.push(DayofDetails);

          console.log("Project code Activities ", tempproj);
        }
        console.log("=================" + JSON.stringify(this.tshtprojectlist.length))
      });

    var currentscope = this;
      var pre_year=null;
      var pre_month=null;
      var pre_day=null;
    $('mat-accordion').on("click", function () {
      
      for (var j = 0; j < currentscope.weekday.length; j++) {

        var dayobjstdatestr = JSON.stringify(currentscope.weekday[j]);
        let dayobjstdate = JSON.parse(dayobjstdatestr);


        stday = dayobjstdate.Date;
        var strmonth = stday.split(" ")[0];
        stday = stday.split(" ")[1];
        strmonth = strmonth.trim();
        var dstdatemonth = strmonth == "JAN" ? "01" : strmonth == "FEB" ? "02" : strmonth == "MAR" ? "03" : strmonth == "APR" ? "04" :
          strmonth == "MAY" ? "05" : strmonth == "JUN" ? "06" : strmonth == "JUL" ? "07" : strmonth == "AUG" ? "08" :
            strmonth == "SEP" ? "09" : strmonth == "OCT" ? "10" : strmonth == "NOV" ? "11" : strmonth == "DEC" ? "12" : "";
        if (stday.length == 1) {
          stday = "0" + stday;
        }

         var stdate= currentscope.currentYear + "-" + dstdatemonth + "-" + stday;
       
        pre_month=dstdatemonth;
        pre_day=stday;
        StartDate = new Date(stdate);
        
      //  console.log("Current Date is:" + CurrentDate)
      console.log("start Date is:" + StartDate)
       console.log("the start month is:" +dstdatemonth)
   
      
          console.log("the selected month is :" + currentscope.mm )
          console.log("mataccord"+currentscope.dateid)
          var id=j+1
      if(currentscope.dateid!==id){
        var id = j + 1
        var ipId = "hours" + id
        console.log("document loaded", $('input[name=' + ipId + ']'));
        $('input[name=' + ipId + ']').attr("disabled", "disabled");
      }
          if(currentscope.dateid===id){
           
            console.log(id+"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            var ipId = "hours" + currentscope.dateid
            $('input[name=' + ipId + ']').attr("enabled", "enabled");
          
        }
  }
    });});
  
  });
//Rejected Date
this.submitTimeSheet()

  }
  
  //DefaultWeekFunction
  

  getYear() {
    var today = new Date();
    this.yy = today.getFullYear();
    for (var i = this.yy; i < this.yy + 2; i++) {
      this.years.push(i - 1);
    }
  }


  getMonth() {
    var today = new Date();
    this.mm = today.getMonth() + 1;
    if (this.mm < 10) {
      this.mm = '0' + this.mm
    }
  }
  public weekChange() {
    var weekflag = true;
    if (this.Monthflag == true) {
      if (weekflag == true) {
        this.display = true
      }

    }
  
  }

  //kishore
  public onWeekSelectedwww(event) {
  
    this.links = [];
    this.tabs = [];
    const value = event.target.value;
    this.weekValue = value;
    console.log("valueof week is" + this.weekValue);
    this.weekday = this.obj[this.weekValue];
    var weeklength = this.weekday.length;
    var objarr = [];
    for (var j = 0; j < weeklength; j++) {
      var dayobjstdatestr = JSON.stringify(this.weekday[j]);
      let dayobjstdate = JSON.parse(dayobjstdatestr);
      console.log(dayobjstdate.Date);
      objarr.push(dayobjstdate.Date)
    }




    this.tabs = objarr;
    //getting length of JSON object from the JSON array
    var len = Object.keys(this.tabs).length;
    for (var i = 0; i <= len; i++) {
      this.links.push(this.tabs[i]);
    }
  }




  public onWeekSelected(event) {
    console.log("***********************"+this.monthselected)
    this.date = new Date();
    this.latest_Date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.latest_Date.split("-");
    this.currentYear = this.latest_Date.split("-")[0];
    this.currentMonth = this.latest_Date.split("-")[1];
    this.currentDate = this.latest_Date.split("-")[2];
    this.links = [];
    this.tabs = [];
    
    const value = event.target.value;
    this.weekValue =value;
    //ex 1:1 to split last value
    this.weekValue= value.split(":")[1];
    this.weekValue=Number(this.weekValue);

    console.log("valueof week is" + this.weekValue);
    //copying from last week
    // var weekCount=this.weekValue-1
    // console.log(weekCount+"********************")
      // this.authService.getWeek(this.monthselected, this.currentYear).subscribe(
      //   (res: any) => {
      //     this.obj = JSON.parse(res);
      //     console.log(this.obj);
      //     this.count = this.obj.length;
      //     console.log(this.count);
      //     this.week = [];
      
      // this.conditionCount=0;
      //  while(this.conditionCount!=3) {
           
      //          this.weekday = this.obj[weekCount];
      //         //  var weeklength = Object.keys(this.weekday).length;

      // var dayobjstdatestr = JSON.stringify(this.weekday[0]);
      //       let dayobjstdate = JSON.parse(dayobjstdatestr);
      //       console.log(dayobjstdate.Date);

      //       var dayobjeddatestr = JSON.stringify(this.weekday[6]);
      //       let dayobjeddate = JSON.parse(dayobjeddatestr);
      //       console.log(dayobjeddate.Date);
      //       console.log("Week" + " " + (weekCount) + "(" + dayobjstdate.Date + "-" + dayobjeddate.Date + ")")
      //       this.copyweek.push({ copyweeknam: ("Week" + " " + (this.weekValue) + "(" + dayobjstdate.Date + "-" + dayobjeddate.Date + ")"), copyweekvalue: this.weekValue-1 });
      //       weekCount=weekCount-1
      //       this.conditionCount++
      //     }

      //   })
    
    //************************************

    //get based index to get array object
    this.weekday = this.obj[this.weekValue];
    var weeklength = this.weekday.length;
    var objarr = [];
    objarr.push("Projects")
    var stday = "0";
    var edday = "0";
    var stdatemonth = this.monthselected;
    var eddatemonth = this.monthselected;
    for (var j = 0; j < this.weekday.length; j++) {

      var dayobjstdatestr = JSON.stringify(this.weekday[j]);
      let dayobjstdate = JSON.parse(dayobjstdatestr);
      console.log(dayobjstdate.Date);
      objarr.push(dayobjstdate.Date)

      //not used (kishore) --------------------
      if (j == 0) {
        stday = dayobjstdate.Date;
        var strmonth = stday.split(" ")[0];
        stday = stday.split(" ")[1];
        strmonth = strmonth.trim();
        stdatemonth = strmonth == "JAN" ? "01" : strmonth == "FEB" ? "02" : strmonth == "MAR" ? "03" : strmonth == "APR" ? "04" :
          strmonth == "MAY" ? "05" : strmonth == "JUN" ? "06" : strmonth == "JUL" ? "07" : strmonth == "AUG" ? "08" :
            strmonth == "SEP" ? "09" : strmonth == "OCT" ? "10" : strmonth == "NOV" ? "11" : strmonth == "DEC" ? "12" : "";


        //  console.log("*********************************** "+this.getInputMonthFromStr(strmonth));
        if (stday.length == 1) {
          stday = "0" + stday;
        }
      } else if (j == 6) {
        edday = dayobjstdate.Date;
        var strmonth = edday.split(" ")[0];
        eddatemonth = strmonth == "JAN" ? "01" : strmonth == "FEB" ? "02" : strmonth == "MAR" ? "03" : strmonth == "APR" ? "04" :
          strmonth == "MAY" ? "05" : strmonth == "JUN" ? "06" : strmonth == "JUL" ? "07" : strmonth == "AUG" ? "08" :
            strmonth == "SEP" ? "09" : strmonth == "OCT" ? "10" : strmonth == "NOV" ? "11" : strmonth == "DEC" ? "12" : "";
        edday = edday.split(" ")[1];
        if (edday.length == 1) {
          edday = "0" + edday;
        }
      }
    }
    //------------------------------------
    this.tabs = objarr;
    //getting length of JSON object from the JSON array
    var len = Object.keys(this.tabs).length;
    for (var i = 0; i <= len; i++) {
      this.links.push(this.tabs[i]);
    }

    var startYear; var endYear
      if(stdatemonth =="12" && this.monthselected=="01"){
      startYear=Number(this.currentYear)
      startYear=startYear-1;
      endYear =this.currentYear;
    }
    else if(this.monthselected=="12" && eddatemonth =="01"){
      startYear=this.currentYear;
      endYear=Number(this.currentYear)
      endYear=endYear+1;
    }
    else{
    startYear=this.currentYear;
    endYear =this.currentYear;
    }
//remove day [sun, mon, tue etc..] in this API "getTimeSheetDetails_bsdon_emp"
  stday = stday.split("(")[0];
  edday= edday.split("(")[0];
  console.log(stday +"===="+edday)
  if(stday.length==1){
  stday="0"+stday
  }
  else{
  stday=stday
  }
  if(edday.length==1){
  edday="0"+edday
  }
  else{
  edday=edday
  }

    var stdate =startYear+ "-" + stdatemonth + "-" + stday;
    var eddate =endYear+ "-" + eddatemonth + "-" + edday;

    this.wkstartday = stdate;
    this.wkendday = eddate;
    var StartDate = new Date(stdate)
    var EndDate = new Date(eddate)
    var CurrentDate = new Date(this.latest_Date)
    
    //get project list and activtiy list
    this.authService.getTimesheetDetails(sessionStorage.getItem("emp_id"), stdate, eddate).subscribe(
      (res: any) => {

        let allprojDetailsjobj = JSON.parse(res);
        this.tshtprojectlist = allprojDetailsjobj;

        for (var i = 0; i < this.tshtprojectlist.length; i++){
          let proj = this.tshtprojectlist[i];
          let tempproj: any;
          var projcodeval = proj.ProjectCode;
          var actvval = proj.ActivityNames;
          tempproj = {
            projcodeval: actvval
          }
          let DayofDetails: any = [];
          let DayofDetail: any = [];
          DayofDetail = proj.DayofDetail;
          for (var j = 0; j < DayofDetail.length; j++) {
            let tempprojs: any;
            tempprojs = DayofDetail[j];
            if (tempprojs.SelectedActivity) {
              DayofDetails.push(tempprojs.SelectedActivity);
            }

          }
          this.selectActvIdsList.push(DayofDetails);

          console.log("Project code Activities ", tempproj);
        }
        console.log("=================" + JSON.stringify(this.tshtprojectlist.length))
      });

    var currentscope = this;
      var pre_year=null;
      var pre_month=null;
      var pre_day=null;
    $('mat-accordion').on("click", function () {
      
      for (var j = 0; j < currentscope.weekday.length; j++) {

        var dayobjstdatestr = JSON.stringify(currentscope.weekday[j]);
        let dayobjstdate = JSON.parse(dayobjstdatestr);


        stday = dayobjstdate.Date;
        var strmonth = stday.split(" ")[0];
        stday = stday.split(" ")[1];
        strmonth = strmonth.trim();
        var dstdatemonth = strmonth == "JAN" ? "01" : strmonth == "FEB" ? "02" : strmonth == "MAR" ? "03" : strmonth == "APR" ? "04" :
          strmonth == "MAY" ? "05" : strmonth == "JUN" ? "06" : strmonth == "JUL" ? "07" : strmonth == "AUG" ? "08" :
            strmonth == "SEP" ? "09" : strmonth == "OCT" ? "10" : strmonth == "NOV" ? "11" : strmonth == "DEC" ? "12" : "";
        if (stday.length == 1) {
          stday = "0" + stday;
        }

         var stdate= currentscope.currentYear + "-" + dstdatemonth + "-" + stday;
       
        pre_month=dstdatemonth;
        pre_day=stday;
        StartDate = new Date(stdate);
        
      //  console.log("Current Date is:" + CurrentDate)
      console.log("start Date is:" + StartDate)
       console.log("the start month is:" +dstdatemonth)
   
      
          console.log("the selected month is :" + currentscope.monthselected )
          if(currentscope.currentMonth !==currentscope.monthselected){
            var id = j + 1
            var ipId = "hours" + id
            console.log(ipId);
  
            console.log("document loaded", $('input[name=' + ipId + ']'));
            $('input[name=' + ipId + ']').attr("disabled", "disabled");
    
          
        }
        //future date disable condition
    //     if (StartDate > CurrentDate ||dstdatemonth !==currentscope.monthselected){
    //      console.log("************"+currentscope.currentMonth)
    //       console.log("Checked")
    //       var id = j + 1
    //       var ipId = "hours" + id
    //       console.log(ipId);

    //       console.log("document loaded", $('input[name=' + ipId + ']'));
    //       $('input[name=' + ipId + ']').attr("disabled", "disabled");

    // }
    if (dstdatemonth !==currentscope.monthselected){
           console.log("************"+currentscope.currentMonth)
            console.log("Checked")
            var id = j + 1
            var ipId = "hours" + id
            console.log(ipId);
  
            console.log("document loaded", $('input[name=' + ipId + ']'));
            $('input[name=' + ipId + ']').attr("disabled", "disabled");
  
      }
    }
    });


  }


  public dateOnClick(event) {
    console.log('Clicked: ' + event.tab.textLabel);
    var tabString = event.tab.textLabel;
    this.intTabValue = parseInt(tabString.match(/[0-9]+/)[0], 10);
    console.log("The tabstring value is:" + this.intTabValue);
  }

  addrow = false;
  add: any;

  public onClickRow() {
    this.isExpanded = !this.isExpanded;
    this.addrow = true;
    this.add = []
  }


  public getInputMonthFromStr(monstr) {
    monstr = monstr.trim();
    if (monstr === 'Jan') return '01';
    if (monstr === 'Feb') return '02';
    if (monstr === 'Mar') return '03';
    if (monstr === 'Apr') return '04';
    if (monstr === 'May') return '05';
    if (monstr === 'Jun') return '06';
    if (monstr === 'Jul') return '07';
    if (monstr === 'Aug') return '08';
    if (monstr === 'Sep') return '09';
    if (monstr === 'Oct') return '10';
    if (monstr === 'Nov') return '11';
    if (monstr === 'Dec') return '12';

  }

  public SumbitCheck() {
    if (this.newtshtlist.length == 0 && this.updatetshtlist.length == 0) {
      this.submitTimeSheet()
    }
    else {

      swal.fire({ title: "please save before submit", showConfirmButton: true }).then(result => {
        if (result.value) {

        } else {

        }
      })
    }
  }


  public saveTimeSheet() {
    if (this.newtshtlist.length != 0) {
      console.log("====================", JSON.stringify(this.newtshtlist));
      this.authService.saveTimeSheetList(this.newtshtlist).subscribe(
        (res: any) => {
          console.log(res);
          swal.fire({ title: "Timesheet Saved Successfully", showConfirmButton: true }).then(result => {
            if (result.value) {
            
            } else {
            
            }
            })
        })

      this.newtshtlist = [];
    }
    if (this.updatetshtlist.length != 0) {
      console.log(JSON.stringify(this.updatetshtlist));
      this.authService.updateTimeSheetList(this.updatetshtlist).subscribe(
        (res: any) => {
          console.log(res);
          swal.fire({ title: "Timesheet Updated Successfully", showConfirmButton: true }).then(result => {
            if (result.value) {
            
            } else {
            
            }
            })
        })
      this.updatetshtlist = [];
    }
  }
  //
  public submitTimeSheet() {
    let submittshtList: any = [];
    
    //  this.newtshtlist
    //  this.updatetshtlist
    //  this.tshtprojectlist
if( this.timesheetSubCheck==false){
    this.authService.getTimesheetDetails(sessionStorage.getItem("emp_id"), this.wkstartday, this.wkendday).subscribe(
      (res: any) => {
        
        let allprojDetailsjobj = JSON.parse(res);

        console.log("=================" + JSON.stringify(allprojDetailsjobj))
        for (var i = 0; i < allprojDetailsjobj.length; i++) {
          let projectobj = allprojDetailsjobj[i];
          let projDayofDetail = [];
          (projectobj) ? projDayofDetail = projectobj.DayofDetail : '';

          for (var j = 0; j < projDayofDetail.length; j++) {

            let wrkactiv: any;
            wrkactiv = projDayofDetail[j];

            let Activityobj: any;
            Activityobj = wrkactiv.Activity;
            
            // (Activityobj.day1)? console.log("tsht_id:: "+Activityobj.day1.tsht_id):'';
            // (Activityobj.day1)? console.log("Hours:: "+Activityobj.day1.hours):'';


        


            if (Activityobj.day1) {
              var sele_actv_iD = wrkactiv.SelectedActivity;
              let submitetshtobj = {
                "tsht_id": Activityobj.day1.tsht_id,
                "activity_id": sele_actv_iD,
                "emp_id": sessionStorage.getItem("emp_id"),
                "proj_code": projectobj.ProjectCode,
                "hours": Activityobj.day1.hours,
                "remarks": Activityobj.day1.remarks,
                "status": "submitted"
              };
              submittshtList.push(submitetshtobj);
            }
            if (Activityobj.day2) {
              var sele_actv_iD = wrkactiv.SelectedActivity;
              let submitetshtobj = {
                "tsht_id": Activityobj.day2.tsht_id,
                "activity_id": sele_actv_iD,
                "emp_id": sessionStorage.getItem("emp_id"),
                "proj_code": projectobj.ProjectCode,
                "hours": Activityobj.day2.hours,
                "remarks": Activityobj.day2.remarks,
                "status": "submitted"
              };
              submittshtList.push(submitetshtobj);
            }
            if (Activityobj.day3) {
              console.log("wrkactiv",wrkactiv)
              //var actv_iD = Number(wrkactiv.SelectedActivity);
              var sele_actv_iD = wrkactiv.SelectedActivity;
              console.log("actv_iD",sele_actv_iD)
              let submitetshtobj = {
                "tsht_id": Activityobj.day3.tsht_id,
                "activity_id": sele_actv_iD,
                "emp_id": sessionStorage.getItem("emp_id"),
                "proj_code": projectobj.ProjectCode,
                "hours": Activityobj.day3.hours,
                "remarks": Activityobj.day3.remarks,
                "status": "submitted"
              };
              submittshtList.push(submitetshtobj);
            }
            if (Activityobj.day4) {
              var sele_actv_iD = wrkactiv.SelectedActivity;
              let submitetshtobj = {
                "tsht_id": Activityobj.day4.tsht_id,
                "activity_id": sele_actv_iD,
                "emp_id": sessionStorage.getItem("emp_id"),
                "proj_code": projectobj.ProjectCode,
                "hours": Activityobj.day4.hours,
                "remarks": Activityobj.day4.remarks,
                "status": "submitted"
              };
              submittshtList.push(submitetshtobj);
            }
            if (Activityobj.day5) {
              var sele_actv_iD = wrkactiv.SelectedActivity;
              let submitetshtobj = {
                "tsht_id": Activityobj.day5.tsht_id,
                "activity_id": sele_actv_iD,
                "emp_id": sessionStorage.getItem("emp_id"),
                "proj_code": projectobj.ProjectCode,
                "hours": Activityobj.day5.hours,
                "remarks": Activityobj.day5.remarks,
                "status": "submitted"
              };
              submittshtList.push(submitetshtobj);
            }
            if (Activityobj.day6) {
              var sele_actv_iD = wrkactiv.SelectedActivity;
              let submitetshtobj = {
                "tsht_id": Activityobj.day6.tsht_id,
                "activity_id": sele_actv_iD,
                "emp_id": sessionStorage.getItem("emp_id"),
                "proj_code": projectobj.ProjectCode,
                "hours": Activityobj.day6.hours,
                "remarks": Activityobj.day6.remarks,
                "status": "submitted"
              };
              submittshtList.push(submitetshtobj);
            }

            if (Activityobj.day7) {
              var sele_actv_iD = wrkactiv.SelectedActivity;
              let submitetshtobj = {
                "tsht_id": Activityobj.day7.tsht_id,
                "activity_id": sele_actv_iD,
                "emp_id": sessionStorage.getItem("emp_id"),
                "proj_code": projectobj.ProjectCode,
                "hours": Activityobj.day7.hours,
                "remarks": Activityobj.day7.remarks,
                "status": "submitted"
              };
              submittshtList.push(submitetshtobj);
            }

          }


        }

        console.log("submittshtList ", submittshtList);
        this.authService.updateTimeSheetList(submittshtList).subscribe(
          (res: any) => {
            console.log(res);
            swal.fire({ title: "Timesheet Submitted Successfully", showConfirmButton: true }).then(result => {
              if (result.value) {
              
              } else {
              
              }
              })
          })
      });
    }
    //rejected date submission
    if( this.timesheetSubCheck==true){
      let submittshtList: any = [];
 this.authService.getTimesheetDetails(sessionStorage.getItem("emp_id"), this.rejecteddateFormat, this.rejecteddateFormat).subscribe(
   (res: any) => {
     
     let allprojDetailsjobj = JSON.parse(res);

     console.log("=================" + JSON.stringify(allprojDetailsjobj))
     for (var i = 0; i < allprojDetailsjobj.length; i++) {
       let projectobj = allprojDetailsjobj[i];
       let projDayofDetail = [];
       (projectobj) ? projDayofDetail = projectobj.DayofDetail : '';

       for (var j = 0; j < projDayofDetail.length; j++) {

         let wrkactiv: any;
         wrkactiv = projDayofDetail[j];

         let Activityobj: any;
         Activityobj = wrkactiv.Activity;
         
         // (Activityobj.day1)? console.log("tsht_id:: "+Activityobj.day1.tsht_id):'';
         // (Activityobj.day1)? console.log("Hours:: "+Activityobj.day1.hours):'';

         if (Activityobj.day1) {
           var sele_actv_iD = wrkactiv.SelectedActivity;
           let submitetshtobj = {
             "tsht_id": Activityobj.day1.tsht_id,
             "activity_id": sele_actv_iD,
             "emp_id": sessionStorage.getItem("emp_id"),
             "proj_code": projectobj.ProjectCode,
             "hours": Activityobj.day1.hours,
             "remarks": Activityobj.day1.remarks,
             "status": "submitted"
           };
           submittshtList.push(submitetshtobj);
         }
         if (Activityobj.day2) {
          var sele_actv_iD = wrkactiv.SelectedActivity;
           let submitetshtobj = {
             "tsht_id": Activityobj.day2.tsht_id,
             "activity_id": sele_actv_iD,
             "emp_id": sessionStorage.getItem("emp_id"),
             "proj_code": projectobj.ProjectCode,
             "hours": Activityobj.day2.hours,
             "remarks": Activityobj.day2.remarks,
             "status": "submitted"
           };
           submittshtList.push(submitetshtobj);
         }
         if (Activityobj.day3) {
          var sele_actv_iD = wrkactiv.SelectedActivity;
           let submitetshtobj = {
             "tsht_id": Activityobj.day3.tsht_id,
             "activity_id": sele_actv_iD,
             "emp_id": sessionStorage.getItem("emp_id"),
             "proj_code": projectobj.ProjectCode,
             "hours": Activityobj.day3.hours,
             "remarks": Activityobj.day3.remarks,
             "status": "submitted"
           };
           submittshtList.push(submitetshtobj);
         }
         if (Activityobj.day4) {
           var sele_actv_iD = wrkactiv.SelectedActivity;
           let submitetshtobj = {
             "tsht_id": Activityobj.day4.tsht_id,
             "activity_id": sele_actv_iD,
             "emp_id": sessionStorage.getItem("emp_id"),
             "proj_code": projectobj.ProjectCode,
             "hours": Activityobj.day4.hours,
             "remarks": Activityobj.day4.remarks,
             "status": "submitted"
           };
           submittshtList.push(submitetshtobj);
         }
         if (Activityobj.day5) {
          var sele_actv_iD = wrkactiv.SelectedActivity;
           let submitetshtobj = {
             "tsht_id": Activityobj.day5.tsht_id,
             "activity_id": sele_actv_iD,
             "emp_id": sessionStorage.getItem("emp_id"),
             "proj_code": projectobj.ProjectCode,
             "hours": Activityobj.day5.hours,
             "remarks": Activityobj.day5.remarks,
             "status": "submitted"
           };
           submittshtList.push(submitetshtobj);
         }
         if (Activityobj.day6) {
          var sele_actv_iD = wrkactiv.SelectedActivity;
           let submitetshtobj = {
             "tsht_id": Activityobj.day6.tsht_id,
             "activity_id": sele_actv_iD,
             "emp_id": sessionStorage.getItem("emp_id"),
             "proj_code": projectobj.ProjectCode,
             "hours": Activityobj.day6.hours,
             "remarks": Activityobj.day6.remarks,
             "status": "submitted"
           };
           submittshtList.push(submitetshtobj);
         }

         if (Activityobj.day7) {
          var sele_actv_iD = wrkactiv.SelectedActivity;
           let submitetshtobj = {
             "tsht_id": Activityobj.day7.tsht_id,
             "activity_id": sele_actv_iD,
             "emp_id": sessionStorage.getItem("emp_id"),
             "proj_code": projectobj.ProjectCode,
             "hours": Activityobj.day7.hours,
             "remarks": Activityobj.day7.remarks,
             "status": "submitted"
           };
           submittshtList.push(submitetshtobj);
         }

       }


     }

     console.log("submittshtList ", submittshtList);
     this.authService.updateTimeSheetList(submittshtList).subscribe(
       (res: any) => {
         console.log(res);
       })
   });
    }

  }

  minusTimes(start, end) {
    var a = start.split(":");
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    var b = end.split(":");
    var seconds2 = (+b[0]) * 60 * 60 + (+b[1]) * 60 + (+b[2]);
    var seconds3 = seconds - seconds2

    var hours = Math.floor(seconds3 / 60 / 60);
    var minutes = Math.floor(seconds3 / 60) - (hours * 60);
    return hours + ":" + minutes;
  }

  addTimes(startTime, endTime) {
    var times = [0, 0, 0]
    var max = times.length

    var a = (startTime || '').split(':')
    var b = (endTime || '').split(':')

    // normalize time values
    for (var i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
    }

    // store time values
    for (var i = 0; i < max; i++) {
      times[i] = a[i] + b[i]
    }

    var hours = times[0]
    var minutes = times[1]
    var seconds = times[2]

    if (seconds >= 60) {
      var m = (seconds / 60) << 0
      minutes += m
      seconds -= 60 * m
    }

    if (minutes >= 60) {
      var h = (minutes / 60) << 0
      hours += h
      minutes -= 60 * h
    }

    return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2)
  }





  //kishor & Swetha
  public timeField_Changes(event, dayobj, ddid, day, actvstatus) {

    //Total hours & Billable Hours calculation line 1558
    const value = event.target.value;

    var activid = (<HTMLInputElement>document.getElementById(ddid)).value;
    var projcode = ddid.split("_")[0];

    var totalhrs = (<HTMLInputElement>document.getElementById("totalHrs_" + projcode)).innerHTML;
    totalhrs = totalhrs.substr(totalhrs.indexOf(":") + 1, totalhrs.length);
    console.log("totalhrs : " + totalhrs + " value : " + value + " dd ID :" + ddid + "actvstatus :" + actvstatus);
    if ((this.temHour == null || this.temHour.length == 0) && (value != null || value.length != 0)) {
      (<HTMLInputElement>document.getElementById("totalHrs_" + projcode)).innerHTML = "Total Hours:" + this.addTimes(totalhrs + ":00", value + ":00");
    } else if ((this.temHour != null || this.temHour.length != 0) && (value == null || value.length == 0)) {
      (<HTMLInputElement>document.getElementById("totalHrs_" + projcode)).innerHTML = "Total Hours:" + this.minusTimes(totalhrs + ":00", this.temHour + ":00");
    } else if ((this.temHour != null || this.temHour.length != 0) && (value != null || value.length != 0)) {
      (<HTMLInputElement>document.getElementById("totalHrs_" + projcode)).innerHTML = "Total Hours:" + this.minusTimes(totalhrs + ":00", this.temHour + ":00");
      totalhrs = (<HTMLInputElement>document.getElementById("totalHrs_" + projcode)).innerHTML;
      totalhrs = totalhrs.substr(totalhrs.indexOf(":") + 1, totalhrs.length);
      (<HTMLInputElement>document.getElementById("totalHrs_" + projcode)).innerHTML = "Total Hours:" + this.addTimes(totalhrs + ":00", value + ":00");
    }


    if (actvstatus == null || actvstatus.length == 0) {
      for (var i = 0; i < this.tshtprojectlist.length; i++) {
        let objproj = this.tshtprojectlist[i];
        console.log("objproj", objproj)
        var actvnmsobj = objproj.ActivityNames;
        console.log("actvnmsobj", actvnmsobj)
        var actvnmsobjarr = actvnmsobj.split(",");
        for (var j = 0; j < actvnmsobjarr.length; j++) {
          if (actvnmsobjarr[j].split("-")[0] == activid) {
            actvstatus = actvnmsobjarr[j].split("-")[2];
            console.log("actvstatus", actvstatus)
          }
        }

      }
    }

    if (Number(actvstatus) == 1) {

      var billableHrs = (<HTMLInputElement>document.getElementById("billableHrs_" + projcode)).innerHTML;
      billableHrs = billableHrs.substr(billableHrs.indexOf(":") + 1, billableHrs.length);
      console.log("billableHrs : " + billableHrs + " value : " + value + " dd ID :" + ddid + "actvstatus :" + actvstatus);
      if ((this.temHour == null || this.temHour.length == 0) && (value != null || value.length != 0)) {
        (<HTMLInputElement>document.getElementById("billableHrs_" + projcode)).innerHTML = "Billable Hours:" + this.addTimes(billableHrs + ":00", value + ":00");
      } else if ((this.temHour != null || this.temHour.length != 0) && (value == null || value.length == 0)) {
        (<HTMLInputElement>document.getElementById("billableHrs_" + projcode)).innerHTML = "Billable Hours:" + this.minusTimes(billableHrs + ":00", this.temHour + ":00");
      } else if ((this.temHour != null || this.temHour.length != 0) && (value != null || value.length != 0)) {
        (<HTMLInputElement>document.getElementById("billableHrs_" + projcode)).innerHTML = "Billable Hours:" + this.minusTimes(billableHrs + ":00", this.temHour + ":00");
        billableHrs = (<HTMLInputElement>document.getElementById("billableHrs_" + projcode)).innerHTML;
        billableHrs = billableHrs.substr(billableHrs.indexOf(":") + 1, billableHrs.length);
        (<HTMLInputElement>document.getElementById("billableHrs_" + projcode)).innerHTML = "Billable Hours:" + this.addTimes(billableHrs + ":00", value + ":00");
      }

    }
    var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(value);
     
    if (isValid) {
    if (dayobj == null) {
      //this.newtshtlist
      this.description = "";
      this.isNewtsht = true;
      var tshtdate = "";
      console.log(day + "=============Links=============" + this.links);
      
      var strdate = this.links[day].split(" ")[1];
      strdate = strdate.split("(")[0];
      if (strdate.length == 1) {
        strdate = "0" + strdate;
        tshtdate = this.currentYear + "-" + this.getmonth(this.links[day].split(" ")[0]) + "-" + strdate;
      } else {
        tshtdate = this.currentYear + "-" + this.getmonth(this.links[day].split(" ")[0]) + "-" + strdate;
      }
      console.log("tshtdate", tshtdate);




      let addtshtobj = {


        "activity_id": activid,
        "emp_id": sessionStorage.getItem("emp_id"),
        "proj_code": projcode,
        "tsht_date": tshtdate,
        "hours": value,
        "remarks": "Null",
        "status": "pending"
      };
      this.newtshtlist.push(addtshtobj);

    } else {

      this.isNewtsht = false;
      this.isExttsht = true;
      this.description = dayobj.remarks;
      let updatetshtobj = {
        "tsht_id": dayobj.tsht_id,
        "activity_id": dayobj.activity_id,
        "emp_id": sessionStorage.getItem("emp_id"),
        "proj_code": dayobj.project_code,
        "hours": value,
        "remarks": "Null",
        "status": "pending"
      };
      this.updatetshtlist.push(updatetshtobj);
      console.log(JSON.stringify(this.updatetshtlist));

    }

    }
    this.temHour = null;
  }


  public getmonth(val) {
    console.log("val",val);
    var answer = "";
    switch (val) {
      case "JAN":
        answer = "01"
        break;
      case "FEB":
        answer = "02"
        break;
      case "MAR":
        answer = "03";
        break;
      case "APR":
        answer = "04";
        break;
      case "MAY":
        answer = "05";
        break;
      case "JUN":
        answer = "06";
        break;
      case "JUL":
        answer = "07";
        break;
      case "AUG":
        answer = "08";
        break;
      case "SEP":
        answer = "09";
        break;
      case "OCT":
        answer = "10";
        break;
      case "NOV":
        answer = "11";
        break;
      case "DEC":
        answer = "12";
        break;
    }
    return answer;
  }


  public timeField_Click(event, dayobj, ddid, day) {
    this.temHour = event.target.value;
    this.pubdayobj = dayobj;
    this.isNewtsht = false;
    this.isExttsht = false;
    console.log("temHour:: " + this.temHour);
    if (this.temHour.length == 0) {
      this.temHour = null;
    }
    console.log($("#descriptionid"))
    if (dayobj == null) {
      //(<HTMLInputElement>document.getElementById("descriptionid")).readOnly=false;
      this.description = null;
    } else {
      this.description = dayobj.remarks;

    }

    this.disable = true;

  }

  public onBlurMethod(event) {
    console.log(event);

    var valHour = event.target.value;
    console.log("valHour", valHour);
    //console.log("onBlurMethod",this.description,this.description.trim().length);

    /* if(this.description && this.description.trim().length!=0)
   {
   this.description=null;
   }
   else */

   //var value = event.target.value
   // var isValid = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
  //  var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(valHour);
  
  //  if (!isValid) {

  //    swal.fire({ title: "Please enter the input in HH:MM format", showConfirmButton: true }).then(result => {
  //      if (result.value) {

  //      } else {

  //      }
  //    })

  //  }


    // if (isValid && (valHour.length != 0) && (this.description == null || this.description.trim().length == 0)) {
      // swal.fire({ title: "please provide the description", showConfirmButton: true }).then(result => {


      //   if (result.value) {
      //     $("#descriptionid")[0].focus();
      //   } else {
      //     $("#descriptionid")[0].focus();
      //   }
      // })
      // console.log($("#descriptionid"));

    // }

    if ((this.pubdayobj && this.pubdayobj.status) && (this.pubdayobj.status == "submitted" || this.pubdayobj.status == "approved")) {
      console.log($("#descriptionid"));
      (<HTMLInputElement>document.getElementById("descriptionid")).readOnly = true;
    } else {
      (<HTMLInputElement>document.getElementById("descriptionid")).readOnly = false;
    }



  }

  public adddescription(event) {
    this.disable = false;
    console.log(this.description);
    if (this.isNewtsht) {
      let thstobj = this.newtshtlist[this.newtshtlist.length - 1]
      thstobj.remarks = this.description;
      this.newtshtlist[this.newtshtlist.length - 1] = thstobj
      console.log("new Thst Description Entry ", this.newtshtlist);
    } else {

      if (!this.isExttsht) {
        if (this.updatetshtlist.length == 0) {
          let updatetshtobj = {
            "tsht_id": this.pubdayobj.tsht_id,
            "activity_id": this.pubdayobj.activity_id,
            "emp_id": sessionStorage.getItem("emp_id"),
            "proj_code": this.pubdayobj.project_code,
            "hours": this.pubdayobj.hours,
            "remarks": this.description,
            "status": "In Process"
          };
          this.updatetshtlist.push(updatetshtobj);
        } else {
          let thstobj = this.updatetshtlist[this.updatetshtlist.length - 1]
          thstobj.remarks = this.description;
          this.updatetshtlist[this.updatetshtlist.length - 1] = thstobj;
        }

      } else {
        let thstobj = this.updatetshtlist[this.updatetshtlist.length - 1];
        thstobj.remarks = this.description;
        this.updatetshtlist[this.updatetshtlist.length - 1] = thstobj;
      }


    }



  }



  public cancel() {
    this.disable = false;
  }
public close(){
  this.router.navigate(['timing-sheet/timesheetweekstatus']);
} 

}