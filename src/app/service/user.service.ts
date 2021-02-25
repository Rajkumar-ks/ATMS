import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BadRequestError } from '../common/bad-request';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { catchError, map } from 'rxjs/operators';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  prof_pic: any;
  ProjEmp : string[] = [];
  ProjOwner : string[] = [];
  employeesId : string[] = [];
  employeeId : any;
  addr_2 : any;
  email_alt : any;
  mobile_alt : any;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //Employees

  countryList(country, state, city): Observable<any> {
    return this.http.get(environment.api_country +  country + "/" + state + "/" + city,  this.httpOptions);
  }

  stateList(country, state, city): Observable<any> {
    return this.http.get(environment.api_state +  country + "/" + state + "/" + city,  this.httpOptions);
  }

  cityList(country, state, city): Observable<any> {
    return this.http.get(environment.api_city +  country + "/" + state + "/" + city,  this.httpOptions);
  }

  getEmployeeDetails(): Observable<any> {
    return this.http.get(environment.api_url + '/User', this.httpOptions).map(res => res);
  }

  getEmployeeDetailsBasedOnProjectOwner(proj_owner): Observable<any> {
    return this.http.get(environment.api_url + '/proj_owner_under_employees/' + proj_owner, this.httpOptions).map(res => res);
  }

  getEmployeeDetailsById(id): Observable<any[]> {
    return this.http.get<any[]>(environment.api_url + '/edit_emp_by_hr/' + id, this.httpOptions).map(res => res);
  }

  getEmployeeById(id): Observable<any[]> {
    return this.http.get<any[]>(environment.api_url + '/edit_emp_by_emp/' + id, this.httpOptions).map(res => res);
  }

  uploadImg(img: any) {
    this.prof_pic = img;
    return this.http.get("#", this.httpOptions).map(res => res);
  }

  saveEmployeeDetails(postData: any): Observable<any> {

    return this.http.post(environment.api_url + '/User', JSON.stringify(postData),  {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })  
      .pipe(
        map((response: any) => response),
        catchError(this.handleError)
      );
  }

  updateEmployeeDetails(id: any, data: any): Observable<any> {

    if(data.addr_2){
      this.addr_2 = data.addr_2
      console.log("addr if ")
    }else{
      this.addr_2 = "null"
      console.log("addr else ")
    }
    if(data.email_alt){
      this.email_alt = data.email_alt
      console.log("email alt if ")
    }else{
      this.email_alt = "null"
      console.log("email alt else ")
    }
    if(data.mobile_alt){
      this.mobile_alt = data.mobile_alt
      console.log("mobile alt if ")
    }else{
      this.mobile_alt = "null"
      console.log("mobile else ")
    }

    if (this.prof_pic == null || this.prof_pic == '') {
      data.prof_pic = "No Edit"
    } else {
      data.prof_pic = this.prof_pic
    }
    if (data.status == true) {
      data.status = "1"
    } else {
      data.status = "0"
    }
    data.emp_id = id
    let created_by = sessionStorage.getItem('created_by');
    data.creator_id = created_by
    data.job_title = data.job_title

    if(data.employees){
      let employees = data.employees
      console.log("data.employees ", employees);
    
      this.employeesId = []
      for(var i = 0; i < employees.length; i++){
        this.employeesId.push(employees[i]['emp_id'])
      }
      this.employeesId.join(',')
      this.employeeId = this.employeesId + ""
    }
    if(data.employees){
      data.emp_list = this.employeeId
    }else{
      data.emp_list = "Null"
    }

    data.RptMrg = "Null"

    console.log("update employee", data);

    return this.http.post(environment.api_url + '/UpdateUser', JSON.stringify(data), this.httpOptions);
  }

  updateHREmployeeDetails(data){
    console.log("update service data ", data);
    
    return this.http.post(environment.api_url + '/update_emp_by_hr', JSON.stringify(data), this.httpOptions);
  }

  addEmployeeDetails(data){
    console.log("Employee service data ", data);
    
    return this.http.post(environment.api_url + '/emp_det_by_employee', JSON.stringify(data), this.httpOptions);
  }

  editEmployeeDetials(data){
    console.log("data and id ", JSON.stringify(data))
    return this.http.post(environment.api_url + '/emp_det_update_by_employee' , JSON.stringify(data), this.httpOptions);
  }

  loadOrganizationlist(): Observable<any> {
    return this.http.get(environment.api_url + '/OrganizationList', this.httpOptions).map(res => res);
  }

  loadRolelist(): Observable<any> {
    return this.http.get(environment.api_url + '/Rolelist', this.httpOptions).map(res => res);
  }

  loadDesignation(): Observable<any> {
    return this.http.get(environment.api_url + '/getUserDesignationList', { responseType: 'text' }).map(res => res);
  }

  checkEmail(email): Observable<any> {
    return this.http.get(environment.api_url + '/CheckEmailPhone/' + email, this.httpOptions).map(res => res);
  }

  checkMobileno(email): Observable<any> {
    return this.http.get(environment.api_url + '/CheckEmailPhone/' + email, this.httpOptions).map(res => res);
  }

  getOTP(): Observable<any> {
    return this.http.get(environment.api_url + '/Forgotpass/swetha.r@agnoshin.com', { responseType: 'text' });
  }

  //Projects

  getProjectDetails(): Observable<any> {
    return this.http.get(environment.api_url + '/Project', this.httpOptions).map(res => res);
  }

  saveProjectDetails(postData): Observable<any> {
    if (postData.status == true) {
      postData.status = "1"
    } else {
      postData.status = "0"
    }

    return this.http.post(environment.api_url + '/Project', JSON.stringify(postData), this.httpOptions);
  }

  saveProjectDetailsWithEmpPro(projectCode , postData, ProjEmp, proOwner): Observable<any> {

    if (postData.status == true) {
      postData.status = "1"
    } else {
      postData.status = "0"
    }
    
    postData.start_date = "2020-12-01"
    postData.end_date = "2020-12-10"

    this.ProjEmp = []
    for(var i = 0; i<ProjEmp.length;i++){
      this.ProjEmp.push(ProjEmp[i]['empid']);
    }
    this.ProjEmp.join(',')
    let empIds = this.ProjEmp + "";

    this.ProjOwner = []
    for(var i = 0; i<proOwner.length;i++){
      this.ProjOwner.push(proOwner[i]['empid']);
    }
   
    postData.ProjEmp = empIds
    postData.proj_owner = proOwner[0]['empid']
    postData.ProjectCode = projectCode;
    console.log("Post Data ",postData);
    return this.http.post(environment.api_url + '/Projectupdate', JSON.stringify(postData), this.httpOptions);
  }
  getProjectownerDetails(projectCode){
    return this.http.get(environment.api_url + '/getProjectownerDetails/' + projectCode, this.httpOptions);
  }
  
  getProjectDetailsById(id): Observable<any[]> {
    return this.http.get<any[]>(environment.api_url + '/Project/' + id, this.httpOptions).map(res => res);
  }

  getProjectEmpDetails(id): Observable<any[]> {  
    return this.http.get<any[]>(environment.api_url + '/Project_Employee_bsdon_proj_code/' + id, this.httpOptions).map(res => res);
  }

  getProjectOwner(): Observable<any> {
    return this.http.get(environment.api_url + '/UserList/false', this.httpOptions).map(res => res);
  }

  getProjectEmp(): Observable<any> {
    return this.http.get(environment.api_url + '/UserList/true', this.httpOptions).map(res => res);
  }

  getProjectList(empid, page, pageSize): Observable<any> {
    let pageN = page - 1;
    if (pageN > 0) {
      pageN = pageN * pageSize
    }
    console.log("Project Owners List with pagination", environment.api_url + '/Project_owners_ProjectList/' + empid + '/' + pageN + '/' + pageSize)
    return this.http.get(environment.api_url + '/Project_owners_ProjectList/' + empid + '/' + pageN + '/' + pageSize, this.httpOptions).map(res => res);
  }
  
  getProjectActivities(code): Observable<any> {
    return this.http.get(environment.api_url + '/ProjectActivities/' + code, this.httpOptions).map(res => res);
  }

  editProjectDetails(postData: object): Observable<any> {
    return this.http.post(environment.api_url + '/Project/Pro003', postData, this.httpOptions);
  }

  // Pagination for User

  getPageination(page, pageSize): Observable<any> {
    let pageN = page - 1;
    if (pageN > 0) {
      pageN = pageN * pageSize
    }
    return this.http.get(environment.api_url + '/User/' + pageN + "/" + pageSize, this.httpOptions);
  }

  // Pagination for User

  getPageinationProject(page, pageSize): Observable<any> {
    
    let pageN = page - 1;
    if (pageN > 0) {
      pageN = pageN * pageSize
    }
    console.log("Pagination URL ", environment.api_url + '/Project/' + pageN + "/" + pageSize);
    return this.http.get(environment.api_url + '/Project/' + pageN + "/" + pageSize, this.httpOptions);
  }

  // Timesheet

  getAllTimesheetDetails(): Observable<any> {
    let projectOwnerId = "AS10001"
    let pageNo = 1
    let pageSize = 5
    console.log(environment.api_url + '/TimeSheetBsdProjectOwner/' + projectOwnerId + '/' + pageNo + '/' + pageSize);
    return this.http.get(environment.api_url + '/TimeSheetBsdProjectOwner/' + projectOwnerId + '/' + pageNo + '/' + pageSize, this.httpOptions).map(res => res);
  }

  loadProjectsList(): Observable<any> {
    return this.http.get(environment.api_url + '/Project', this.httpOptions).map(res => res);
  }

  loadProjectsList_projectowner(): Observable<any> {
    return this.http.get(environment.api_url + '/ProjectList/'+sessionStorage.getItem("emp_id"), this.httpOptions).map(res => res);
  }

  loadActivitesList(): Observable<any> {
    return this.http.get(environment.api_url + '/Activity', this.httpOptions).map(res => res);
  }


  proj_owner_projectActivityList(proj_code,proj_owner): Observable<any> {
    return this.http.get(environment.api_url + '/Proj_owner_ProjectActivities/'  + proj_code +'/'+proj_owner , this.httpOptions).map(res => res);
  }

  LoadCurrentProjectList(teamLeadEmployeeId, projectId, employeeId, activityId , status, startDate, endDate, page, pageSize): Observable<any> {
   
    let pageN = page - 1;
    if (pageN > 0) {
      pageN = pageN * pageSize
    }

    return this.http.get(environment.api_url + '/TimeSheetBsdProjectOwner/' + teamLeadEmployeeId + "/" + projectId + '/' + employeeId + "/" + activityId + "/" + status + "/" + startDate + '/' + endDate + "/" + pageN + '/' + pageSize, this.httpOptions).map(res => res);
  }

  LoadCurrentEmployeesList(employeeId, jobTitle, status, startData, endData, page, pageSize): Observable<any> {
   
    let pageN = page - 1;
    if (pageN > 0) {
      pageN = pageN * pageSize
    }
    console.log(environment.api_url + '/EmployeeList/' + employeeId + "/" + jobTitle + '/' + status + "/" + startData + "/" + endData + "/" +   page + "/" + pageSize);
    
    return this.http.get(environment.api_url + '/EmployeeList/' + employeeId + "/" + jobTitle + '/' + status + "/" + startData + "/" + endData + "/" +   page + "/" + pageSize, this.httpOptions).map(res => res);
  }

  downloadTshtList(teamLeadEmployeeId, projectId, employeeId, activityId , status, startDate, endDate): Observable<any> {
    
    return this.http.get(environment.api_tshtdownload_url+ teamLeadEmployeeId + "/" + projectId + '/' + employeeId + "/" + activityId + "/" + status + "/" + startDate + '/' + endDate, this.httpOptions);
  }

  dropDownlist(): Observable<any> {
    return this.http.get(environment.api_dropdown_list_url,  this.httpOptions);
  }

  clientList(): Observable<any> {
    return this.http.get(environment.api_url + '/ClientList',  this.httpOptions);
  }

  //Project Functionality

  addProject(data): Observable<any> {
    return this.http.post(environment.api_url + '/addproject', JSON.stringify(data),  this.httpOptions);
  }
  editProject(projectCode): Observable<any> {
    return this.http.get(environment.api_url + '/EditProject/' + projectCode, this.httpOptions);
  }
  updateProject(data): Observable<any> {
    return this.http.post(environment.api_url + '/updateproject', JSON.stringify(data),  this.httpOptions);
  }

  addActivity(data): Observable<any> {
    return this.http.post(environment.api_url + '/addprojectactivity' , JSON.stringify(data),  this.httpOptions);
  }
  editActivity(projectCode, PM_Id): Observable<any> {
    console.log("Project code, PM", projectCode, PM_Id);
    return this.http.get(environment.api_url + '/Editprojectactivity/' + projectCode + "/" + PM_Id, this.httpOptions);
  }
  updateActivity(data): Observable<any> {
    return this.http.post(environment.api_url + '/updateprojectactivity' , JSON.stringify(data),  this.httpOptions);
  }

  addResource(data): Observable<any> {
    console.log(JSON.stringify(data));
    return this.http.post(environment.api_url + '/project_resource_allocation' , JSON.stringify(data),  this.httpOptions);
  }
  editResource(projectCode): Observable<any> {
    console.log("Edit Resource Allocation ", environment.api_url + '/Editresourceallocation/' + projectCode);
    return this.http.get(environment.api_url + '/Editresourceallocation/' + projectCode , this.httpOptions);
  }
  updateResource(data): Observable<any> {
    return this.http.post(environment.api_url + '/update_project_resource_allocation' , JSON.stringify(data),  this.httpOptions);
  }

  // Leaves

  addLeaves(postData: any): Observable<any> {
    return this.http.post(environment.api_url_apply_leave, JSON.stringify(postData), this.httpOptions);
    }
    
    addLeaveProcess(postData: any): Observable<any> {
    return this.http.post(environment.api_url_Post_leave, JSON.stringify(postData), this.httpOptions);
    }
    
    addLeavesType(postData: any): Observable<any> {
    return this.http.post(environment.api_url_Post_leave_config, JSON.stringify(postData), this.httpOptions);
    }
    
    updateFutureLeaveConfig(postData: object): Observable<any> {
    return this.http.post(environment.api_url + '/editFutureleaveConfigurationHR', postData, this.httpOptions);
    }
    
    
    getLeaveHistoryForEmp(empid, page, pageSize): Observable<any> {
    let pageN = page - 1;
    if (pageN > 0) {
    pageN = pageN * pageSize
    }
    return this.http.get(environment.api_url_get_leave + '/LeaveHistoryForEmp/' + empid + "/" + pageN + '/' + pageSize, this.httpOptions).map(res => res);
    }
    getLeaveHistoryForRM(empid, status, rpt_mgr, page, pageSize): Observable<any> {
    let pageN = page - 1;
    if (pageN > 0) {
    pageN = pageN * pageSize
    }
    return this.http.get(environment.api_url_get_leave + '/EmployeeLeaveHistoryForRM/' + empid + '/' + status + '/' + rpt_mgr + "/" + pageN + '/' + pageSize, this.httpOptions).map(res => res);
    }
    
    getEmployeeLeaveTypeStatus(empid): Observable<any> {
    return this.http.get(environment.api_url_get_leave + '/EmployeeLeaveTypeStatus/' + empid, this.httpOptions).map(res => res);
    }
    
    getLeaveHistoryForHR(empid, status, from_date, to_date, page, pageSize): Observable<any> {
    
    let pageN = page - 1;
    if (pageN > 0) {
    pageN = pageN * pageSize
    }
    
    return this.http.get(environment.api_url_get_leave + '/EmployeeLeaveHistoryForHR/' + empid + '/' + status + '/' + from_date + '/' + to_date + "/" + pageN + '/' + pageSize, this.httpOptions).map(res => res);
    
    }
    
    getleaveConfigurationStatus(): Observable<any> {
    return this.http.get(environment.api_url_get_leave + '/leaveConfigurationStatus/', this.httpOptions).map(res => res);
    }
    
    getEmplist(empid): Observable<any> {
    return this.http.get(environment.api_url + '/EmployeeListForRM/' + empid, this.httpOptions).map(res => res);
    }
    
    downloadleaveList(empid, status, from_date, to_date): Observable<any> {
    return this.http.get(environment.api_url + '/downloadLeaveReport/' + empid + '/' + status + '/' + from_date + '/' + to_date, this.httpOptions).map(res => res);
    }
    
    getWorkingDaysBetweenTwoDates(stdate, eddate, from_session): Observable<any> {
    return this.http.get(environment.api_url_get_leave + '/getWorkingDaysBetweenTwoDates/' + stdate + '/' + eddate + '/' + from_session, this.httpOptions).map(res => res);
    }
    
    getLeavetypeForEmp(empid): Observable<any> {
    return this.http.get(environment.api_url_get_leave + '/getLeavetypeForEmp/' + empid, this.httpOptions).map(res => res);
    }
    getfutureleaveConfigurationStatus(): Observable<any> {
    return this.http.get(environment.api_url_get_leave + '/futureleaveConfigurationStatus', this.httpOptions).map(res => res);
    }
    
    // Holiday
    
    
    addHolidays(postData: any): Observable<any> {
    return this.http.post(environment.api_url_Holiday, JSON.stringify(postData), this.httpOptions);
    }
    
    editHoliday(postData: any): Observable<any> {
    return this.http.post(environment.api_url + '/editHolidayList', JSON.stringify(postData), this.httpOptions);
    }
    
    editFutureHolidayList(postData: any): Observable<any> {
    return this.http.post(environment.api_url + '/editFutureHolidayList', JSON.stringify(postData), this.httpOptions);
    }
    
    
    getHolidayList(): Observable<any> {
    return this.http.get(environment.api_url + '/holidayList', this.httpOptions).map(res => res);
    }
    
    getfutureHolidayList(): Observable<any> {
    return this.http.get(environment.api_url + '/futureHolidayList', this.httpOptions).map(res => res);
    }

   //Client

    addClient(postData: any): Observable<any> {
      return this.http.post(environment.api_url + '/addClient', JSON.stringify(postData), this.httpOptions);
      }
      editClient(postData: any): Observable<any> {
      return this.http.post(environment.api_url + '/editClient', JSON.stringify(postData), this.httpOptions);
      }
      
      
      
      getClientList(): Observable<any> {
      return this.http.get(environment.api_url + '/ClientList', this.httpOptions).map(res => res);
      }
      
      getClientListitr(clientName, Region, page, pageSize): Observable<any> {
      
      let pageN = page - 1;
      if (pageN > 0) {
      pageN = pageN * pageSize
      }
      return this.http.get(environment.api_url + '/ClientListitr/' + clientName + '/' + Region + '/' + pageN + '/' + pageSize, this.httpOptions).map(res => res);
      }
      
      getAllClientlist(): Observable<any> {
      return this.http.get(environment.api_url + '/ClientNameList', this.httpOptions).map(res => res);
      }
      getRegionlist(): Observable<any> {
      return this.http.get(environment.api_url + '/ClientRegionList', this.httpOptions).map(res => res);
      }
      
      //Business Configuration
      
      addMasterRole(postData: any): Observable<any> {
      return this.http.post(environment.api_url + '/addMasterRole', JSON.stringify(postData), this.httpOptions);
      }

      editMasterRole(postData: any): Observable<any> {
      return this.http.post(environment.api_url + '/editMasterRole', JSON.stringify(postData), this.httpOptions);
      }
          
      // getBunitList(): Observable<any> {
      // return this.http.get(environment.api_url + '/businessUnitList', this.httpOptions).map(res => res);
      // }

      getBunitList(mastertype): Observable<any> {
        return this.http.get(environment.api_url + '/businessUnitList/' + mastertype , this.httpOptions).map(res => res);
      }
      
      getdesigList(): Observable<any> {
      return this.http.get(environment.api_url + '/designationList', this.httpOptions).map(res => res);
      }
      
      getresortypeList(): Observable<any> {
      return this.http.get(environment.api_url + '/resourcetypeList', this.httpOptions).map(res => res);
      }
      
      getlevelList(): Observable<any> {
      return this.http.get(environment.api_url + '/levelList', this.httpOptions).map(res => res);
      }
      
      getroleList(): Observable<any> {
      return this.http.get(environment.api_url + '/roleList', this.httpOptions).map(res => res);
      }
      
      getroletypeList(): Observable<any> {
      return this.http.get(environment.api_url + '/roletypeList', this.httpOptions).map(res => res);
      }
      
      getprojtypeList(): Observable<any> {
      return this.http.get(environment.api_url + '/projtypeList', this.httpOptions).map(res => res);
      }
      
      getprojActvTypeList(): Observable<any> {
      return this.http.get(environment.api_url + '/projActvTypeList', this.httpOptions).map(res => res);
      }
      
      gettechSkillList(): Observable<any> {
      return this.http.get(environment.api_url + '/techSkillList', this.httpOptions).map(res => res);
      }
      
      //new list role // ROLE MODULES
      getRoleNames(): Observable<any> {
        return this.http.get(environment.api_url + '/masterdata' , this.httpOptions);
      }
      
      addRole(data): Observable<any> {
      return this.http.post(environment.api_url + '/addrole' , JSON.stringify(data), this.httpOptions);
      }
      
      getRoleFeature(roleId): Observable<any> {
        console.log(" getRoleFeature : "+ environment.api_url + '/getRoleFeature/' + roleId);
        return this.http.get(environment.api_url + '/getRoleFeature/' + roleId, this.httpOptions);
      }
      
      // /UpdateRolefeature
      UpdateRolefeature(data): Observable<any> {
        console.log(JSON.stringify(data));
        return this.http.post(environment.api_url + '/updateRolefeature' , JSON.stringify(data), this.httpOptions);
      }
      
      //delete roles
      deleteRolefeature(roleId): Observable<any> {
        return this.http.get(environment.api_url + '/deleteRolefeature/' + roleId, this.httpOptions);
      }
      //delete roles
      deleteRole(roleId): Observable<any> {
        return this.http.get(environment.api_url + '/deleteRole/' + roleId, this.httpOptions);
      }
      
      //findAllFeature
      findAllFeatures(): Observable<any> {
        return this.http.get(environment.api_url + '/findAllFeature' , this.httpOptions);
      }

    //Check Date
    checkDate(inputObj): Observable<any> {
      console.log("inputObj-----------> "+JSON.stringify(inputObj))
      return this.http.post(environment.api_url_isValidProjectActivityDate,inputObj, this.httpOptions).map(res => res);
    }  

    getAllocatedHours(inputObj): Observable<any> {
      console.log("inputObj-----------> "+JSON.stringify(inputObj))
      return this.http.post(environment.api_url_getAllocatedHours,inputObj, this.httpOptions).map(res => res);
    }  

    getProjectAllocatedHours(inputObj): Observable<any> {
      console.log("inputObj-----------> "+JSON.stringify(inputObj))
      return this.http.post(environment.api_url_getProjectAllocatedHours,inputObj, this.httpOptions).map(res => res);
    }  

    validateResourceAllocatedHrs(inputObj): Observable<any> {
      console.log("inputObj-----------> "+JSON.stringify(inputObj))
      return this.http.post(environment.api_url_validateResourceAllocatedHrs,inputObj, this.httpOptions).map(res => res);
    }  

    validateResourceAllocateHrsOntime(inputObj): Observable<any> {
      console.log("inputObj-----------> "+JSON.stringify(inputObj))
      return this.http.post(environment.api_url_validateResourceAllocateHrsOntime,inputObj, this.httpOptions).map(res => res);
    }

    //Attendance
    saveAttendance(data): Observable<any> {
      return this.http.post(environment.api_url + '/userattendance',data, this.httpOptions).map(res => res);
    }

    getAttendance(empId): Observable<any> {
      return this.http.get(environment.api_url + '/empAttendanceList/' + empId , this.httpOptions).map(res => res);
    }

    private handleError(error : HttpErrorResponse){
      if(error.status === 400){
        return throwError(new BadRequestError(error))
      }else if(error.status === 404){
        swal.fire({
          title: "An unexcepted error occured! 404",
          confirmButtonText: "Ok",
        });
      }else{
        return throwError(new AppError(error));
      }
    }
  
}

