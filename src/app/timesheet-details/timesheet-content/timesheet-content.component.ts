import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationStart, NavigationEnd} from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { UserService } from './../../service/user.service';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-timesheet-content',
  templateUrl: './timesheet-content.component.html',
  styleUrls: ['./timesheet-content.component.css'],
  providers:[DatePipe]

})
export class TimesheetContentComponent implements OnInit {

  constructor(private router: Router,private authService: AppService,
    private route:ActivatedRoute ,
    private datePipe: DatePipe, private fb: FormBuilder,private userService: UserService
    ) { }

  public tableHeader: any = [];
  public projectList: any = [];
  ActivityList : any = [];
  projectSaveList : any = [];
  submittshtList  : any =[];
  public tshtprojectlist: any = [];
  public tempDayofDetail: any = [];

  public weekVar;

 ngOnInit() {

  this.getTimeSheetParameter();

  }


//It call after load HTML
  ngAfterViewInit()
  {
    var OverAllmonDate =  this.weekVar.split('-');
    var enddate = this.getYearMonthDate(OverAllmonDate[1]);
    var tempStartDate = OverAllmonDate[0].split(':')
    var strtdate = this.getYearMonthDate(tempStartDate[1]);
    this.setHeaderTemplate(strtdate,enddate)
    this.loadAction(strtdate,enddate);
  }


public setHeaderTemplate(strtdate,enddate)
{
    $("#timeSheetPeriodId").text(strtdate +" and " +enddate);
    $("#timeSheetWorkWeekId").text(strtdate +" and " +enddate);
    $("#timeSheetEmpID").text(sessionStorage.getItem("emp_id"));
    $("#timeSheetEmpName").text(sessionStorage.getItem("firstname"));
}

public loadAction(strtdate,enddate)
{
 
    this.authService.checkTimesheetBwtDate(sessionStorage.getItem("emp_id"),strtdate,enddate).subscribe(
    (res: any) => {

        let allprojDetailsjobj = JSON.parse(res)
          
        if(allprojDetailsjobj.count == "0")
          {
            var rowId= 'row_' + this.guidGenerator();
            this.appendTableData("","","","new","",rowId,"","","","","","","");
            return; 
          }

          this.authService.getTimesheetDetails(sessionStorage.getItem("emp_id"),strtdate,enddate).subscribe(
          (res: any) => {

            let allprojDetailsjobj = JSON.parse(res);
            this.tshtprojectlist = allprojDetailsjobj;

            console.log("allprojDetailsjobj  ::: "+ JSON.stringify(allprojDetailsjobj) );

            var status;
            var rowID;
            var status1;
            var status2;
            var status3;
            var status4;
            var status5;
            var status6;
            var status7;


            for (var i = 0; i < this.tshtprojectlist.length; i++){

              let DayofDetail = this.tshtprojectlist[i].DayofDetail;

                for(var j=0;j< DayofDetail.length ;j++)
                {
                  var activitySize = Object.keys(DayofDetail[j].Activity).length;

                  if(activitySize == 0)
                    continue;
              
                  var project_code;
                  var activity_id;

                  if(typeof DayofDetail[j].Activity.day1 !== "undefined") {
                    project_code = DayofDetail[j].Activity.day1.project_code
                    activity_id = DayofDetail[j].Activity.day1.activity_id;
                    status = DayofDetail[j].Activity.day1.status;
                    status1 = DayofDetail[j].Activity.day1.status;
                    rowID  = DayofDetail[j].Activity.day1.row_id
                  }
            
                  if(typeof DayofDetail[j].Activity.day2 !== "undefined") {
                    project_code = DayofDetail[j].Activity.day2.project_code
                    activity_id = DayofDetail[j].Activity.day2.activity_id;
                    status = DayofDetail[j].Activity.day2.status;
                    rowID  = DayofDetail[j].Activity.day2.row_id
                    status2 = DayofDetail[j].Activity.day2.status;

                  }
            
                  if(typeof DayofDetail[j].Activity.day3 !== "undefined") {
                    project_code = DayofDetail[j].Activity.day3.project_code
                    activity_id = DayofDetail[j].Activity.day3.activity_id;
                    status = DayofDetail[j].Activity.day3.status;
                    rowID  = DayofDetail[j].Activity.day3.row_id
                    status3 = DayofDetail[j].Activity.day3.status;

                  }
            
                  if(typeof DayofDetail[j].Activity.day4 !== "undefined") {
                    project_code = DayofDetail[j].Activity.day4.project_code
                    activity_id = DayofDetail[j].Activity.day4.activity_id;
                    status = DayofDetail[j].Activity.day4.status;
                    rowID  = DayofDetail[j].Activity.day4.row_id;
                    status4 = DayofDetail[j].Activity.day4.status;


                  }
            
                  if(typeof DayofDetail[j].Activity.day5 !== "undefined") {
                    project_code = DayofDetail[j].Activity.day5.project_code
                    activity_id = DayofDetail[j].Activity.day5.activity_id;
                    status = DayofDetail[j].Activity.day5.status;
                    rowID  = DayofDetail[j].Activity.day5.row_id;
                    status5 = DayofDetail[j].Activity.day5.status;

                  }
            
                  if(typeof DayofDetail[j].Activity.day6 !== "undefined") {
                    project_code = DayofDetail[j].Activity.day6.project_code
                    activity_id = DayofDetail[j].Activity.day6.activity_id;
                    status = DayofDetail[j].Activity.day6.status;
                    rowID  = DayofDetail[j].Activity.day6.row_id;
                    status6 = DayofDetail[j].Activity.day6.status;

                  }
                
                  if(typeof DayofDetail[j].Activity.day7 !== "undefined") {
                    project_code = DayofDetail[j].Activity.day7.project_code
                    activity_id = DayofDetail[j].Activity.day7.activity_id;
                    status = DayofDetail[j].Activity.day7.status;
                    rowID  = DayofDetail[j].Activity.day7.row_id;
                    status7 = DayofDetail[j].Activity.day7.status;

                  }

              this.appendTableData(DayofDetail[j],project_code,activity_id,"load",status,rowID,status1,status2,status3,status4,status5,status6,status7);
              status1="";status2="";status3="";status4="";status5="";status6="";status7="";
            }

      }

     
        if(status == "submitted")
        {
          $("#submitTimesheetId").hide();
        }
       

        var rowCount = $('#timesheetTableId tr').length;
        if(rowCount == 1 && status !="Rejected" && status != "pending") 
        {
           var firstRowId = $("#timesheetTableId tr:first").attr('id');
           var id = firstRowId.replace('row_','');
            $("#minus_"+id.trim()).prop("disabled", true);
            $("#minus_"+id.trim()).css({backgroundColor: '#E7EBE8'});
            $("#save_"+id.trim()).prop("disabled", true);
            $("#save_"+id.trim()).css({backgroundColor: '#E7EBE8'});
        } 
        this.calculateTotalHours();

    })
    })

  }

 

  public getTimeSheetParameter()
  {
    this.weekVar="";
    this.route.queryParams.subscribe(params => {
      this.getTableHeader(params.month,params.week);
      this.weekVar =params.week;
      },
      err => {
      
    });
  }
  public getTableHeader(selectedMonth,week)
  {
  
    const currentYear = (new Date()).getFullYear();
  
      this.authService.getWeek(selectedMonth, currentYear.toString()).subscribe(
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
  
            var tempWeek = startMonth.Date + '-' + endMonth.Date
            var dayWeek = week.split(":")[1];
            
            if(tempWeek.trim() != dayWeek.trim() )
                    continue;
            
  
            this.tableHeader.push("Project Name");
            this.tableHeader.push("Activity Name");
          
            for(var i = 0 ; i< weeklength ;i++)
            {
                  var tempdayWeekMonth = JSON.stringify(weekday[i]);
                  let dayWeekMonth = JSON.parse(tempdayWeekMonth);
                  this.tableHeader.push(dayWeekMonth.Date);
            }
            this.tableHeader.push("Action");
  
          }
  
        })
  }
  

  public checkStatus(tempStatus)
  {
    var disableAttr = "disabled";

      if(tempStatus == "Rejected" || tempStatus == "pending")
         disableAttr ="";
      else if(tempStatus == "")
         disableAttr ="";
      else if( tempStatus == undefined || tempStatus == "undefined")
         disableAttr ="";


    return disableAttr;
  }

  public appendTableData(DayofDetail,project_code,activity_id,actName,status,rowID,status1,status2,status3,status4,status5,status6,status7)
  {

    var rowTempId = rowID
    var myId =  rowTempId.replace("row_",'');
    var disableAttr = "disabled";
    var saveBtnStyle = "style='background:green'";
    var deleteBtnStyle = "style='background:red'";

    if(actName == "load" && status == "Rejected")
        disableAttr="";
    if(actName == "add" || actName == "new" || status == "pending")
          disableAttr="";
    
    if(status == "submitted" || status == "Approved") 
    {
      saveBtnStyle   = "style=backgroundColor: #E7EBE8" ;
      deleteBtnStyle = "style=backgroundColor: #E7EBE8" ;
    }

    var top = "<tr id =" + rowTempId + "><td>"
      + "<span class='br' style='display: block;margin-bottom:0.4em;'></span>"
      +"<select  class='projrctName' name='activity' id=proj_"+ myId + " required style='width: 125px;height: 24px;border: 1px solid black;' "+disableAttr+">"
      + "</select>"
      +"<select  class='activityName' name='activity' id=act_" + myId + " required style='width: 126px;height: 24px;border: 1px solid black;' "+disableAttr+">"
      + "</select><style>input[type=text]{text-align:center;border:1px solid black; }input:focus {text-align:center ;border:2px solid green; }</style>"
      
      +"<input  class='day1' type='text' id=hr1_"+ myId +" placeholder='00:00' name='day1' style='width: 109px;height: 24px;' "+ this.checkStatus(status1) +">"
        +"<textarea  class='discription1' id=disc1_"+ myId +" style='display:none;'></textarea>"
      +"<input  class='day2' type='text' id=hr2_"+ myId +" placeholder='00:00' name='day2' style='width: 109px;height: 24px;' "+this.checkStatus(status2)+">"
        +"<textarea class='discription2' id=disc2_"+ myId +" style='display:none;'></textarea>"
      +"<input  class='day3' type='text' id=hr3_"+ myId +" placeholder='00:00' name='day3' style='width: 109px;height: 24px;' "+this.checkStatus(status3)+">"
        +"<textarea class='discription3' id=disc3_"+ myId +" style='display:none;'></textarea>"
      +"<input  class='day4' type='text' id=hr4_"+ myId +"  placeholder='00:00' name='day4' style='width: 109px;height: 24px;' "+this.checkStatus(status4)+">"
        +"<textarea class='discription4' id=disc4_"+ myId +" style='display:none;'></textarea>"
      +"<input  class='day5' type='text' id=hr5_"+ myId +"  placeholder='00:00' name='day5' style='width: 109px;height: 24px;' "+this.checkStatus(status5)+">"
        +"<textarea class='discription5' id=disc5_"+ myId +" style='display:none;'></textarea>"
      +"<input  class='day6' type='text' id=hr6_"+ myId +" placeholder='00:00' name='day6' style='width: 109px;height: 24px;' "+this.checkStatus(status6)+">"
        +"<textarea class='discription6' id=disc6_"+ myId +" style='display:none;'></textarea>"
      +"<input  class='day7' type='text' id=hr7_"+ myId +" placeholder='00:00' name='day7' style='width: 109px;height: 24px;' "+this.checkStatus(status7)+">"
        +"<textarea class='discription7' id=disc7_"+ myId +" style='display:none;'></textarea>"
      
      +"<button "+saveBtnStyle+" id=save_" + myId + " "+disableAttr+"><i style='color:white' class='fa fa-floppy-o'></i></button>"
      + "<button "+deleteBtnStyle+" id=minus_" + myId + " "+disableAttr+"><i style='color:white' class='fa fa-trash'></i></button>"
      + "<input type='hidden' id=statusId_"+ myId + " name='statusId' value = "+status+">"
      + "</td></tr>"

    $('#' + "timesheetTableId" ).append(top);
    
    this.callEvents(myId); // call function events
    this.getProjectList(myId,project_code,activity_id);
    
    if(actName == "load")
        this.setLoadData(DayofDetail,myId,project_code,activity_id);
  }

  setLoadData(DayofDetail,id,project_code,activity_id)
  {
      if(project_code != ""){
      
          if(typeof DayofDetail.Activity.day1 !== "undefined") {
            $("#hr1_"+ id).val(DayofDetail.Activity.day1.hours);
            $("#disc1_"+ id).html(DayofDetail.Activity.day1.remarks);
          }

          if(typeof DayofDetail.Activity.day2 !== "undefined") {
            $("#hr2_"+ id).val(DayofDetail.Activity.day2.hours);
            $("#disc2_"+ id).html(DayofDetail.Activity.day2.remarks);
          }

          if(typeof DayofDetail.Activity.day3 !== "undefined") {
            $("#hr3_"+ id).val(DayofDetail.Activity.day3.hours);
            $("#disc3_"+ id).html(DayofDetail.Activity.day3.remarks);
          }

          if(typeof DayofDetail.Activity.day4 !== "undefined") {
            $("#hr4_"+ id).val(DayofDetail.Activity.day4.hours);
            $("#disc4_"+ id).html(DayofDetail.Activity.day4.remarks);
          }

          if(typeof DayofDetail.Activity.day5 !== "undefined") {
            $("#hr5_"+ id).val(DayofDetail.Activity.day5.hours);
            $("#disc5_"+ id).html(DayofDetail.Activity.day5.remarks);
          }

          if(typeof DayofDetail.Activity.day6 !== "undefined") {
            $("#hr6_"+ id).val(DayofDetail.Activity.day6.hours);
            $("#disc6_"+ id).html(DayofDetail.Activity.day6.remarks);
          }
        
          if(typeof DayofDetail.Activity.day7 !== "undefined") {
            $("#hr7_"+ id).val(DayofDetail.Activity.day7.hours);
            $("#disc7_"+ id).html(DayofDetail.Activity.day7.remarks);
          }
    }    
}

 

public callEvents(tempId)
{ 
  var myId = tempId.replace("row_",'');

  var savebtn = $('#row_' + myId + ' #save_' + myId);
  savebtn[0].addEventListener('click', (evt) => this.saveTimeSheet('save',myId));

  var removebtn = $('#row_' + myId + ' #minus_' + myId);
  removebtn[0].addEventListener('click', (evt) => this.removeTimesheetRow(myId));

  var projOnChange = $('#row_' + myId + ' #proj_' + myId);
  projOnChange[0].addEventListener('change', (evt) => this.onChangeProjectName(myId));

  //onblur
  var inputField = $('#row_' + myId + " input[type=text]");
  inputField[0].addEventListener('blur', (evt) => this.showDiscriptionPopup('disc1_'+myId));
  inputField[1].addEventListener('blur', (evt) => this.showDiscriptionPopup('disc2_'+myId));
  inputField[2].addEventListener('blur', (evt) => this.showDiscriptionPopup('disc3_'+myId));
  inputField[3].addEventListener('blur', (evt) => this.showDiscriptionPopup('disc4_'+myId));
  inputField[4].addEventListener('blur', (evt) => this.showDiscriptionPopup('disc5_'+myId));
  inputField[5].addEventListener('blur', (evt) => this.showDiscriptionPopup('disc6_'+myId));
  inputField[6].addEventListener('blur', (evt) => this.showDiscriptionPopup('disc7_'+myId));

  // keyPress event
  inputField[0].addEventListener('keyup', (evt) => this.keyupFun(evt));
  inputField[1].addEventListener('keyup', (evt) => this.keyupFun(evt));
  inputField[2].addEventListener('keyup', (evt) => this.keyupFun(evt));
  inputField[3].addEventListener('keyup', (evt) => this.keyupFun(evt));
  inputField[4].addEventListener('keyup', (evt) => this.keyupFun(evt));
  inputField[5].addEventListener('keyup', (evt) => this.keyupFun(evt));
  inputField[6].addEventListener('keyup', (evt) => this.keyupFun(evt));

}


showDiscriptionPopup(descriptionId)
{
    var tempDiscription =  $("#"+ descriptionId).html();

    var tempHtml="";

    if(tempDiscription)
        tempHtml = "<textarea id=discription >"+tempDiscription+"</textarea>";
    else
        tempHtml = '<textarea id=discription > </textarea>';

    swal.fire({
        title: 'Description',
        html: tempHtml,
        showCancelButton: true
        }).then((result) => {
        
           var discription = $('#discription').val();//The value of select input name1
        
          if(discription !="" || discription != null)
              $("#"+ descriptionId).html(discription);
     });
}

public onChangeProjectName(id)
{
  this.getProActivityList(id,"");
}


//load project name list
public getProjectList(Id,project_code,activity_id)
{    
   
    this.projectList = [];
    this.authService.getProjectLists(sessionStorage.getItem("emp_id")).subscribe(
      (res: any) => {

        this.projectList= JSON.parse(res);
        
        var select = document.getElementById("proj_"+Id);

        for (var i = 0; i < this.projectList.length; i++) {
          var option = document.createElement("option");
          option.textContent = this.projectList[i].projName;
          option.value = this.projectList[i].projCode;
          select.appendChild(option);
        }

        if(project_code !="")
             $('#'+"proj_"+Id).val(project_code);

        this.getProActivityList(Id,activity_id); // add activity list

      })
}

//load activity name list
public getProActivityList(Id,activity_id)
{
    $('#act_'+Id).empty();
    var selectedProjCode = $("#proj_"+Id).val();
    this.authService.getProjActivityList(sessionStorage.getItem("emp_id"),selectedProjCode).subscribe(
      (res: any) => {
        
              let ActivityNameList= JSON.parse(res);
              var select = document.getElementById("act_"+Id);

              for (var i = 0; i < ActivityNameList.length; i++) {
                var option = document.createElement("option");
                option.textContent = ActivityNameList[i].activityName;
                option.value = ActivityNameList[i].activityId;
                select.appendChild(option);
              }

              if(activity_id !="")
                  $('#'+"act_"+Id).val(activity_id);
      })
}


// remove timesheet
  public removeTimesheetRow(id)
  {
   
    var OverAllmonDate =  this.weekVar.split('-');
    var enddate = this.getYearMonthDate(OverAllmonDate[1]);
    var tempStartDate = OverAllmonDate[0].split(':')
    var strtdate = this.getYearMonthDate(tempStartDate[1]);
    var row_id = 'row_' + id ;
    
    var self = this;
    swal.fire({
      title: "Are you sure?",
      text: "Do You Want To Delete?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, I am sure!',
      cancelButtonText: "No, cancel it!"
     
    }).then(
         function (result) { 
        
         if(result.isConfirmed){
             self.authService.deleteTimesheetBwtDate(sessionStorage.getItem("emp_id"),strtdate,enddate,row_id).subscribe(
                (res: any) => {
                swal.fire({ title: "TimeSheet Removed Successfully!!", showConfirmButton: true })
                var rowCount = $('#timesheetTableId tr').length;
                
                if(rowCount == 2)
                {
                $('#row_'+id).remove();
                var firstRowId = $("#timesheetTableId tr:first").attr('id');
                var tempId = firstRowId.replace('row_','');
                $("#minus_"+tempId.trim()).prop("disabled", true);
                $("#minus_"+tempId.trim()).css({backgroundColor: '#E7EBE8'});
                this.calculateTotalHours();
                return;
                }
                
                $('#row_'+id).remove();
                this.calculateTotalHours();
                }, err => {
                swal.fire({ title: "Failed To Removed Timesheet!!", showConfirmButton: true })
                });
              }
        },
         function () { return false; });

}

  //add timesheet
  public addTimesheetRow()
  {
      var rowId= 'row_' + this.guidGenerator();

      this.appendTableData("","","","add","",rowId,"","","","","","","");

      var rowCount = $('#timesheetTableId tr').length;
      if(rowCount > 1)
      {
          var firstRowId = $("#timesheetTableId tr:first").attr('id');
          var id = firstRowId.replace('row_','');
          var status = $("#statusId_"+id).val();

          if(status != "submitted" && status != "Approved"){
               $("#minus_"+id.trim()).prop("disabled", false);
               $("#minus_"+id.trim()).css({backgroundColor: '#dc3214'});
          }
        return;
      }
  }


  public guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }


//Get data for save timesheet
public saveTimeSheet(actName,myId)
{
      var Day1Header = $('#timeSheetTable_HeadrId th').eq(2).text();
      var Day2Header = $('#timeSheetTable_HeadrId th').eq(3).text();
      var Day3Header = $('#timeSheetTable_HeadrId th').eq(4).text();
      var Day4Header = $('#timeSheetTable_HeadrId th').eq(5).text();
      var Day5Header = $('#timeSheetTable_HeadrId th').eq(6).text();
      var Day6Header = $('#timeSheetTable_HeadrId th').eq(7).text();
      var Day7Header = $('#timeSheetTable_HeadrId th').eq(8).text();

      var self = this;
      
      $('#timesheetTableId #row_'+ myId).each(function() {
          
          var  row_index 		 = $("#timesheetTableId tr").index(this);
          var  projectCode 	 = $('.projrctName', this).val();
          var  activityID 	 = $('.activityName', this).val();
          var  day1          = $('.day1',this).val();	   
          var  day2          = $('.day2',this).val();	   
          var  day3          = $('.day3',this).val();
          var  day4          = $('.day4',this).val();	   
          var  day5          = $('.day5',this).val();	   
          var  day6          = $('.day6',this).val();	   
          var  day7          = $('.day7',this).val();

          var  discription1  = $('.discription1',this).text();
          var  discription2  = $('.discription2',this).text();
          var  discription3  = $('.discription3',this).text();
          var  discription4  = $('.discription4',this).text();
          var  discription5  = $('.discription5',this).text();
          var  discription6  = $('.discription6',this).text();
          var  discription7  = $('.discription7',this).text();

              
          self.appendSaveData(projectCode,activityID,day1,Day1Header,discription1,myId);
          self.appendSaveData(projectCode,activityID,day2,Day2Header,discription2,myId);
          self.appendSaveData(projectCode,activityID,day3,Day3Header,discription3,myId);
          self.appendSaveData(projectCode,activityID,day4,Day4Header,discription4,myId);
          self.appendSaveData(projectCode,activityID,day5,Day5Header,discription5,myId);
          self.appendSaveData(projectCode,activityID,day6,Day6Header,discription6,myId);
          self.appendSaveData(projectCode,activityID,day7,Day7Header,discription7,myId);

        });  
    
    this.saveTimeSheetAction(myId)

}

//Save timesheet
public saveTimeSheetAction(myId)
{
  var OverAllmonDate =  this.weekVar.split('-');
  var enddate = this.getYearMonthDate(OverAllmonDate[1]);
  var tempStartDate = OverAllmonDate[0].split(':')
  var strtdate = this.getYearMonthDate(tempStartDate[1]);
  var row_id = 'row_' + myId;

  this.authService.deleteTimesheetBwtDate(sessionStorage.getItem("emp_id"),strtdate,enddate,row_id).subscribe(
     (res: any) => {
        this.authService.saveTimeSheetList(this.projectSaveList).subscribe(
          (res: any) => {
            swal.fire({ title: "TimeSheet Saved Successfully!!", showConfirmButton: true })
            $("#submitTimesheetId").show();
            this.projectSaveList = [];
          }, err => {
            swal.fire({ title: "TimeSheet Failed to Save!!", showConfirmButton: true })
          })
    })
}


//append save data
public appendSaveData(projcode,activid,tempHours,tshtdate,discription,myId)
{

  if(tempHours == "")
      return;

  let addtshtobj = {
    "activity_id": activid,
    "row_id": 'row_'+myId,
    "emp_id": sessionStorage.getItem("emp_id"),
    "proj_code": projcode,
    "tsht_date": this.getYearMonthDate(tshtdate),
    "hours": tempHours,
    "remarks": discription,
    "status": "pending"
  };
  this.projectSaveList.push(addtshtobj);
}


getYearMonthDate(sheduleDate)
{
   var months = {'jan' : '01','feb' : '02','mar' : '03','apr' : '04','may' : '05','jun' : '06',
      'jul' : '07','aug' : '08','sep' : '09','oct' : '10','nov' : '11','dec' : '12'
    }

    const currentYear = (new Date()).getFullYear();
    var monDate = sheduleDate.trim().split('(');
    var monthNum = months[monDate[0].substring(0,3).toLowerCase()];
    var  date  = monDate[0].slice(-2);
    var tempDate;

    if(date.trim().length == 1)
        tempDate = "0"+ date.trim();
    else
        tempDate = date.trim();

    var yeadMonDate = currentYear + '-' + monthNum + '-'+ tempDate
    return yeadMonDate;
}

//Get submit action data
public sumbitTimesheet(actName)
{
      var self = this;
      this.submittshtList=[];

      $('#timesheetTableId tr').each(function() {
      self.appendSubmitData(this.id);
      });

      this.submitTimeSheetAction();
  
}

//append submit data
  public appendSubmitData(rowId)
  {
      let submitetshtobj = {
        "row_id" : rowId,
        "status": "submitted"
      };
      this.submittshtList.push(submitetshtobj);
    }

  //Submit action  
  public submitTimeSheetAction()
  {
  
        this.authService.submitTimeSheetList(this.submittshtList).subscribe(
          (res: any) => {
            swal.fire({ title: "Timesheet Submitted Successfully!!!", showConfirmButton: true });
          }, err => {
            swal.fire({ title: "Timesheet Submition Failed!!!", showConfirmButton: true });
          })
  }





public keyupFun(evet)
{
    $("#submitTimesheetId").hide();
    this.calculateTotalHours();

}

public calculateTotalHours(){

     var previousTime = $("#timeSheetTotalHrId").text();
  
      var totalHr = 0;    
  
      $('#timesheetTableId tr').each(function() {
  
      var hr1 = ( $('.day1',this).val() == "") ? "00:00:00" : $('.day1',this).val();
      var hr2 = ( $('.day2',this).val() == "") ? "00:00:00" : $('.day2',this).val();
      var hr3 = ( $('.day3',this).val() == "") ? "00:00:00" : $('.day3',this).val();
      var hr4 = ( $('.day4',this).val() == "") ? "00:00:00" : $('.day4',this).val();
      var hr5 = ( $('.day5',this).val() == "") ? "00:00:00" : $('.day5',this).val();
      var hr6 = ( $('.day6',this).val() == "") ? "00:00:00" : $('.day6',this).val();
      var hr7 = ( $('.day7',this).val() == "") ? "00:00:00" : $('.day7',this).val();
  
      totalHr = totalHr +  parseInt(hr1.split(':')[0], 10) + 
                  parseInt(hr2.split(':')[0], 10) +
                  parseInt(hr3.split(':')[0], 10) +
                  parseInt(hr4.split(':')[0], 10) +
                  parseInt(hr5.split(':')[0], 10) +
                  parseInt(hr6.split(':')[0], 10) +
                  parseInt(hr7.split(':')[0], 10);
      });
  
      $("#timeSheetTotalHrId").text(totalHr + ":00");
  
  }

}
