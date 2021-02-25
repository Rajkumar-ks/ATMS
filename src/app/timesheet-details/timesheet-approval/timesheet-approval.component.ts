import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import {IMyDpOptions} from 'mydatepicker';
import swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timesheet-approval',
  templateUrl: './timesheet-approval.component.html',
  styleUrls: ['./timesheet-approval.component.css']
})
export class TimesheetApprovalComponent implements OnInit {

  

  isSelected = false;
  rows: any
  mfDataTable:any
  public show:boolean = false;

  msg: string;
	clss: string;
  products = [];
  status = "submitted";

  projectList : {};
  activitiesList : {};
  TimesheetsList : any;
  TimesheetList : any;
  masterSelected = "Rejected";
  projectId ="All";
  employeeId = "All";
  startDate = "null";
  endDate = "null";
  activityId = "All";
  teamLeadEmployeeID : any;
  remarks : any;

  page : Number = 1;
  pageSize = 5;
  pageSizes = [3,6,9];
  count : Number;

  empDetails : any;
  employees : any;
  billableHours = [];
  billHours = [];

  dropdownList = [];
  selectedItems = [];
  submittedData = [];
  approvalData = [];
  tmp = [];
  temp = [];
  arr = [];
  obj = [];

  date : any;

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

  //checkbox 
  name = 'Angular';
  isMasterSel:boolean;
  timesheetListt:any;
  checkedTimesheetList:any;
  addTimesheetList : any;
  constructor(
    private userService : UserService,
    private authService :AppService,
private router: Router  ) { 
   
  }

  ngOnInit() {
    this.teamLeadEmployeeID = sessionStorage.getItem("emp_id");

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
    this.selectedItems = [];

    this.userService.loadProjectsList_projectowner().subscribe(
      res => { 
        this.projectList = res;
        console.log("Project List", JSON.stringify(this.projectList));
      },
      err => {
        console.log("GET Project List API error");
      }
    );

    this.userService.loadActivitesList().subscribe(
      res => { 
        this.activitiesList = res;
        console.log("Activites List", JSON.stringify(this.activitiesList));
      },
      err => {
        console.log("GET Activites List API error");
      }
    );

    this.userService.proj_owner_projectActivityList(this.projectId, this.teamLeadEmployeeID).subscribe(
      res => { 
        this.activitiesList = res;
        console.log("Activites List", JSON.stringify(this.activitiesList));
      },
      err => {
        console.log("GET Activites List API error");
      }
    );

    this.userService.LoadCurrentProjectList(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status, this.startDate, this.endDate, this.page, this.pageSize).subscribe(
      res => { 
        this.count = res.Count
        this.TimesheetsList = res.Data;
        console.log("this.Timesheet ", this.TimesheetsList);
        
        for(let i = 0; i < res.Data.length; i++){
          if(res.Data[i]['actv_status'] == "1"){
            this.billHours.push(res.Data[i]['hours'])
          }
          this.temp.push({ id : res.Data[i]['hours'], itemName : res.Data[i]['actv_status'] })
        }
        this.billableHours = this.temp;
      },
      err => {
        console.log("GET Load Current Project List List API error");
      }
    );

  }
  searchEmployee(emp_id){
    
    this.employeeId = emp_id;
    console.log("emp id ", this.employeeId)

    if(this.employeeId != 'All')
    this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status, this.startDate, this.endDate, this.page, this.pageSize);
  }
  
  searchProject(pro_id){
    this.employeeId = 'All'
    console.log("pro id",pro_id)
    this.projectId = pro_id;
    this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status, this.startDate, this.endDate, this.page, this.pageSize);
  }

  searchActivity(activityId){
    this.activityId = activityId
    this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status, this.startDate, this.endDate, this.page, this.pageSize);
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
    this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status, this.startDate, this.endDate, this.page, this.pageSize);
  }

  handlePageSizeChange(event): void{
    this.pageSize = event.target.value;
    this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId ,this.status, this.startDate, this.startDate,this.page, this.pageSize);
  }

  handlePageChange(pageNo){
    this.page = pageNo
    this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status, this.startDate, this.endDate, this.page, this.pageSize);
  }

  loadProjects(teamLeadEmployeeID, projectId, employeeID, activityId, status, startDate, endDate, page, pageSize){
    console.log("projects det " , teamLeadEmployeeID, projectId, employeeID, activityId, status, startDate, endDate,  page, pageSize)
    this.userService.LoadCurrentProjectList(teamLeadEmployeeID, projectId, employeeID, activityId, status, startDate, endDate, page, pageSize).subscribe(
      res => { 
        this.count = res.Count
        this.TimesheetsList = res.Data;
        console.log("this.Timesheet ", this.TimesheetsList);
        
        for(let i = 0; i < res.Data.length; i++){
          if(res.Data[i]['actv_status'] == "1"){
            this.billHours.push(res.Data[i]['hours'])
          }
          this.temp.push({ id : res.Data[i]['hours'], itemName : res.Data[i]['actv_status'] })
        }
        this.billableHours = this.temp;
        //console.log("Bill hours", this.billHours);
        //console.log(this.billableHours);
        // console.log("Load Current Project List List", this.count, JSON.stringify(this.TimesheetsList));
      },
      err => {
        console.log("GET Load Current Project List List API error");
      }
    );
  }

  cancel(event){
    this.remarks =  event.target.value
  }
  rejectCancel(){
    this.show=false;
  }

  onItemSelect(item:any){
    console.log("On select",item);
    console.log(this.selectedItems);

    this.projectId = 'All'
    this.employeeId = item.id;
    console.log("emp id ", this.employeeId)

    if(this.employeeId != 'All')
    this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, this.status, this.startDate, this.endDate, this.page, this.pageSize);
  }

  OnItemDeSelect(item:any){
      console.log(item);
      console.log(this.selectedItems);
  }

  onSelectAll(items: any){
      console.log(items);
      this.projectId = 'All'
      this.employeeId = 'All'
      this.status = "submitted"
      this.loadProjects(this.teamLeadEmployeeID, this.projectId, this.employeeId, this.activityId, status, this.startDate, this.endDate, this.page, this.pageSize);
  }

  onDeSelectAll(items: any){
      console.log(items);
  }

  getEmp(emp){
    console.log("On change",emp)
  }

  checkUncheckAll() {
    for (var i = 0; i < this.TimesheetsList.length; i++) {
      this.TimesheetsList[i].isSelected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }
   
  isAllSelected() {
    this.isMasterSel = this.TimesheetsList.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }
  
  getCheckedItemList(){
    this.checkedTimesheetList = [];
    for (var i = 0; i < this.TimesheetsList.length; i++) {
      if(this.TimesheetsList[i].isSelected)
      this.checkedTimesheetList.push(this.TimesheetsList[i]);
    }
    this.checkedTimesheetList = JSON.stringify(this.checkedTimesheetList);
    console.log(this.checkedTimesheetList);
    
  }

  approvedTimehseet(){
    this.addTimesheetList = JSON.parse(this.checkedTimesheetList);

    for(var i = 0; i < this.addTimesheetList.length; i++){
      this.addTimesheetList[i].tsht_id = this.addTimesheetList[i].tsht_id
      this.addTimesheetList[i].approverId = this.addTimesheetList[i].emp_id
      this.addTimesheetList[i].status = "Approved"
    }

    console.log("Submitted Data for Approval ", this.addTimesheetList);
    this.authService.timesheetApproval(this.addTimesheetList).subscribe(
      (res: any) => {
        console.log("Approved Timesheet", res);
          swal.fire({ title: "Approved Timesheet!!", showConfirmButton: true })
      }, err => {
          swal.fire({ title: "Approved Timesheet Failed!!", showConfirmButton: true })
      })
  }

  rejectTimesheet(){


    this.show = !this.show;
    this.addTimesheetList = JSON.parse(this.checkedTimesheetList);

    for(var i = 0; i < this.addTimesheetList.length; i++){
      this.addTimesheetList[i].tsht_id = this.addTimesheetList[i].tsht_id
      this.addTimesheetList[i].approverId = this.addTimesheetList[i].emp_id
      this.addTimesheetList[i].status = "Rejected"
      this.addTimesheetList[i].rejt_remarks = this.remarks
    }
    
  

    this.authService.timesheetApproval(this.addTimesheetList).subscribe(
      (res: any) => {
        swal.fire({ title:"Are you sure want to Reject? ", showConfirmButton: true,showCancelButton :true}).then(result => {
          if (result.value) {
            this.router.navigate(['timing-sheet/fillingtimesheet'])
          } else {
    
          }
        })
      })
  }

}
