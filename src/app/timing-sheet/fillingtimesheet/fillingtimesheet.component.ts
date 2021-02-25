import { Event } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {  IDropdownSettings } from 'ng-multiselect-dropdown';
import {DateAdapter} from "@angular/material";
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-fillingtimesheet',
  templateUrl: './fillingtimesheet.component.html',
  styleUrls: ['./fillingtimesheet.component.css']
})
export class FillingtimesheetComponent implements OnInit {
rows: any
mfDataTable:any
  projectList : {};
  activitiesList : {};
  TimesheetsList : {};
  projectId : "All";
  employeeId : any;
  startDate = "null";
  endDate = "null";
  activityId = "All";
  teamLeadEmployeeID : any;

  status = "All";

  page : Number = 1;
  pageSize = 5;
  pageSizes = [5, 10, 50];
  count : Number;

  empDetails : any;
  employees : any;

  dropdownList = [];
  selectedItems = [];
  tmp = [];
  arr = [];
  obj = [];

  date : any;
  dropdownSettings:IDropdownSettings;

  DojMax = new Date(Date.now());

  public myDatePickerOptions1: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '37px',
    width : '150px'
  };

  public myDatePickerOptionsF: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '37px',
    width : '150px'
  };

  constructor(
    private userService : UserService,
    private dateAdapter: DateAdapter<Date>
  ) {
    dateAdapter.setLocale("en-in"); // DD/MM/YYYY
   }

  ngOnInit() {
    this.teamLeadEmployeeID=sessionStorage.getItem("emp_id"), this.projectId="All", this.employeeId="All"

    this.DojMax.setDate( this.DojMax.getDate());
    this.DojMax.setFullYear( this.DojMax.getFullYear());

    this.userService.getEmployeeDetailsBasedOnProjectOwner(this.teamLeadEmployeeID).subscribe(
      res => { 
        this.empDetails = res;
        console.log(res);
        console.log(res[0]['emp_id'])
        for(let i = 0; i < res.length; i++){
          this.tmp.push({ id : res[i]['emp_id'], itemName : res[i]['emp_name'] })
        }
        this.employees = this.tmp;
        console.log(this.empDetails);
      },
      err => {
        console.log("GET Employee API error")
      }
    );

    this.userService.LoadCurrentProjectList(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status, this.startDate, this.endDate, this.page, this.pageSize).subscribe(
      res => { 
        this.count = res.Count
        this.TimesheetsList = res.Data;
        console.log("Load Current Project List Oninit", this.count, JSON.stringify(this.TimesheetsList));
      },
      err => {
        console.log("GET Load Current Project List List API error");
      }
    );

    this.selectedItems = [];
    this.dropdownSettings = { 
        singleSelection: false, 
        textField:"itemName",
        selectAllText:'Select All',
        unSelectAllText:'UnSelect All',
        allowSearchFilter: true,
        itemsShowLimit: 3
    };            

    this.teamLeadEmployeeID =sessionStorage.getItem("emp_id");

    this.userService.loadProjectsList_projectowner().subscribe(
      res => { 
        this.projectList = res;
        console.log("Project List", JSON.stringify(this.projectList));
      },
      err => {
        console.log("GET Project List API error");
      }
    );
    this.userService.proj_owner_projectActivityList(this.projectId,this.teamLeadEmployeeID).subscribe(
      res => { 
        this.activitiesList = res;
        console.log("Activites List", JSON.stringify(this.activitiesList));
      },
      err => {
        console.log("GET Activites List API error");
      }
    ); 
   
  }

  searchEmployee(emp_id){
    
    this.employeeId = emp_id;
    console.log("emp id ", this.employeeId)

    if(this.employeeId != 'All')
    this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status,this.startDate, this.endDate, this.page, this.pageSize);
  }
  
  searchProject(pro_id){
    this.employeeId = 'All'
    console.log("pro id",pro_id)
    this.projectId = pro_id;
    
   
    this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status,this.startDate, this.endDate, this.page, this.pageSize);
  }

  searchActivity(activityId){
    this.activityId = activityId
    this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status,this.startDate, this.endDate, this.page, this.pageSize);
  }

  searchStartDate(startDate){
    if(startDate.formatted === ''){
      this.startDate = "null"
    }else{
      this.startDate = startDate.formatted
      this.startDate = this.startDate.split("-").reverse().join("-");
      console.log("Start Date ", this.startDate);
    }
  }

  searchEndDate(endDate){
    if(endDate.formatted === ''){
      this.endDate = "null"
    }else{
      this.endDate = endDate.formatted
      this.endDate = this.endDate.split("-").reverse().join("-");
      console.log("End Date ", this.endDate);
    }
    this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status,this.startDate, this.endDate, this.page, this.pageSize);
  }

  searchStatus(status){
    this.status = status;
    this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status,this.startDate, this.endDate, this.page, this.pageSize);
  }

  handlePageSizeChange(event): void{
    this.pageSize = event.target.value;
    this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status,this.startDate, this.endDate, this.page, this.pageSize);
  }

  handlePageChange(pageNo){
    this.page = pageNo
    this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status,this.startDate, this.endDate, this.page, this.pageSize);
  }

  loadProjects(teamLeadEmployeeID, projectId, employeeID, activityId, status, startDate, endDate, page, pageSize){
    console.log("projects det " , teamLeadEmployeeID, projectId, employeeID, activityId, status, startDate, endDate,  page, pageSize)
    this.userService.LoadCurrentProjectList(teamLeadEmployeeID, projectId, employeeID, activityId, status, startDate, endDate, page, pageSize).subscribe(
      res => { 
        this.count = res.Count
        this.TimesheetsList = res.Data;
        console.log("Load Current Project List List", this.count, JSON.stringify(this.TimesheetsList));
      },
      err => {
        console.log("GET Load Current Project List List API error");
      }
    );
  }

  onItemSelect(item:any){
    console.log("On select",item);
    console.log(this.selectedItems);

    //this.projectId = 'All'
    this.employeeId = item.id;
    console.log("emp id ", this.employeeId)

    if(this.employeeId != 'All')
    this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status, this.startDate, this.endDate, this.page, this.pageSize);
  }


  downloadtsht(){
    this.userService.downloadTshtList(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status, this.startDate, this.endDate).subscribe(
      response => { 
        let obj:any;
        console.log("response path :"+response);
        console.log("response path :"+response.path);
        window.open(response.path);
      },
      err => {
        console.log("Download API error",err);
      }
    );
  }

  OnItemDeSelect(item:any){
      console.log(item);
      console.log(this.selectedItems);
  }

  onSelectAll(items: any){
      console.log(items);
      this.employeeId = 'All'
      this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status,this.startDate, this.endDate, this.page, this.pageSize);
  }

  onDeSelectAll(items: any){
      console.log(items);
  }

  getEmp(emp){
    console.log("On change",emp)
  }

  // convertDate(startDate){
  //   var date = new Date(startDate),
  //   mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  //   day = ("0" + date.getDate()).slice(-2);
  // return [date.getFullYear(), mnth, day].join("-");
  // }

}
