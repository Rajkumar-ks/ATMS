import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';

import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { UserService } from 'src/app/service/user.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import * as _ from 'lodash';
import {  IDropdownSettings } from 'ng-multiselect-dropdown';


declare const $: any;
@Component({
  selector: 'app-employee-add-list',
  templateUrl: './employee-add-list.component.html',
  styleUrls: ['./employee-add-list.component.css']
})
export class EmployeeAddListComponent implements OnInit{

  public format: string = 'MMMM y';

  dropdownSettings:IDropdownSettings;

  form: FormGroup;  
    
  bloodGroup = [
        {"name":"A+"},
        {"name":"A-"},
        {"name":"B+"},
        {"name":"B-"},
        {"name":"AB+"},
        {"name":"A+"},
        {"name":"AB-"},
    ]

  creator : any;
  firstName : any;
  lastName : any;
  postData : any;
  data : any;
  postData_Arr = [];
  educationDetailsArr =  [];
  technicalDetailsArr = [];
  certificationDetailsArr = [];
  previousEmployeement = [];
  familyDetailsArr = [];
  bankDetails : any;
  addEmployeeErrMsg : any;
  yearId : any;
  monthId  : any;

  isEmployeeId = false;
  isBasicDetails = true;
  isBankDetails = false;
  isDocumentDetails = false;
  
  isEducationalDetails = false;
  isTechnicalSkillsDetails = false;
  isCertificationDetails = false;
  isPreEmpDetails = false;
  isFamilyDetails = false;

  testimgresult : any; 

  public myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '28px',
  };

  business_unit_arr = [];
  resource_type_Arr = [];
  role_type_arr = [];
  level_type_arr = [];
  role_id_arr = [];

  prgOwnerRes : string[] = []

  employeeId : any;
  jobTitle  : any;
  jobs : any;
  statusE : any;
  startDate = "null";
  endDate = "null";
  count : Number;

  employeeStatus : any;
  employeeStatusArr = [];
  
  selectedItems = [];
  employeesArr =  []
  rows = [];
  public updateEmp = [];
  public createEmp:any = {};
  public srch = [];
  addEmployeeValidation:boolean = false;
  fileToUpload: File = null;
  roleId : any;

  public columns:Array<any> = [
    {title: 'Name', name: 'name', sort: true},
    {title: 'Employee ID', name: 'employeeID', sort: true},
    {title: 'Email', name: 'email', sort: true},
    {title: 'Mobile', name: 'mobile', sort: true},
    {title: 'Join Date', name: 'joinDate', sort: true},
    {title: 'Role', name: 'role', sort: true},
    {title: 'Action', name: 'action', sort: true}
  ];

  public allEmployees:boolean = true;

  public modules = [];
  public addEmp:any = {};
  OrganizationList : {};
  RoleList : {};
  public emailError : string = "";
  public mobileError : string = "";

  empDetails : string;
  paginationData : string;
  empData : any;
  loading : boolean;
  checked = true;
  checkedEmployees = false;
  hide : boolean;
  public date: Date = new Date();
  public model: any = {date: {year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()}};
  

  public jsonArr:any;

  employeeData : any;
  totalRecords : string
  page : Number = 1;
  pageSize = 5;
  pageSizes = [5,10,15];
  Count : Number;
  employee : any;
  tmp = [];
  job = [];

  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }
  constructor(private appService:AppService,
              private router:Router,
              private userService : UserService,
              public fb: FormBuilder) { 
                
    this.rows = appService.employees;
    this.srch = [...this.rows];
    this.modules = appService.employee_modules;
   
    this.data = new Array<any>();
  }


  ngOnInit() {

    this.creator = sessionStorage.getItem("emp_id")
    this.firstName = sessionStorage.getItem("firstname")
    this.lastName = sessionStorage.getItem("lastname")

    this.userService.getEmployeeDetailsById(this.creator).subscribe(
      (result) => {
        console.log("Employee by id Details Success ", result);
        this.employeeData = result
       },
      err => {
        console.log("Employee by id Details Failure ", err);
      }
    )

    this.form = this.fb.group({

      city : ['', Validators.required],
      ph_no: ['', Validators.required],
      emr_contact_per_name : ['', Validators.required],
      emr_contact_per_ph_no : ['', Validators.required],
      perm_addr : ['', Validators.required],
      temp_addr : ['', Validators.required],
      blood_grp : ['', Validators.required],
     
      addhar_num : ['', Validators.required],
      aadhar_soft_copy : [''],
      uan_num : ['', Validators.required],
      pan_soft_copy : [''],
      passport_num : ['', Validators.required],
      passport_exp_date : ['', Validators.required],
      pass_soft_copy : [''],
      passport_place_issued : ['', Validators.required],

      bank_details : this.fb.array([this.addBankGroup()]),
      
      education : this.fb.array([this.addEducationGroup()]),
      techskills : this.fb.array([this.addSkillGroup()]),
      certification : this.fb.array([this.addCertificationGroup()]),
      previous_employment : this.fb.array([this.addPreviousEmployeementGroup()]),
      emp_fmly_details : this.fb.array([this.addFamilyGroup()])
     })
    
    this.testimgresult = "http://192.168.8.135:8080/Agno/TimeSheet/Users/ProfilePicture/default-user.jpg"

    this.hide = false;

    this.dropdownSettings = {
      idField: 'empid',
      textField: 'f_name',
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      deSelectText:'DeSelect',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    // this.userService.getEmployeeDetails().subscribe(
    //   res => { 
    //     this.empDetails = JSON.parse(JSON.stringify(res));
    //     this.empDetails = res;
    //     console.log("Employee Details ",this.empDetails);
    //     console.log("job title ", res[0]['job_title']);
        
    //     for(var i = 0; i < this.empDetails.length; i++){
    //       this.employeesArr.push({"empid" : this.empDetails[i]['emp_id'], "f_name" : this.empDetails[i]['f_name'], "l_name" : this.empDetails[i]['l_name'] })
    //     }
    //     console.log("emp id ", this.employeesArr);

    //     for(let i = 0; i < res.length; i++){
    //       this.tmp.push({ id : res[i]['emp_id'], itemName : res[i]['f_name'] })
    //     }
    //     this.employee = this.tmp;

    //     for(let i = 0; i < res.length; i++){
    //       this.job.push({ id : res[i]['job_title'], itemName : res[i]['job_title'] })
    //     }
    //     this.jobs = this.job;
    //     console.log("job title ", this.jobs);

    //     for(let i = 0; i < res.length; i++){
    //       this.employeeStatusArr.push({ id : res[i]['status'], itemName : res[i]['status'] })
    //     }
    //     this.employeeStatus = this.employeeStatusArr;
    //     console.log("Employee Status ", this.employeeStatus);
        
    //   },
    //   err => {
    //     console.log("GET Employee API error")
    //   }
    // );
   
    $('.floating').on('focus blur', function (e) {
      $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
    
    this.userService.loadOrganizationlist().subscribe(
      res => { 
        this.OrganizationList = res;
      },
      err => {
        console.log("GET Organization API error");
      }
    );

    // this.userService.loadRolelist().subscribe(
    //   res => { 
    //     this.RoleList = res;
    //   },
    //   err => {
    //     console.log("GET Role List API error");
    //   }
    // );
    // this.userService.loadDesignation().subscribe(
    //   res => {
    //    // console.log("Designation Details" , typeof(res), res);
    //     this.jsonArr = JSON.parse(res);
    //     console.log("Designation Details" , typeof(this.jsonArr), this.jsonArr);
    //   },
    //   err => {
    //     console.log("Get Designation API Error")
    //   }
    // );

    // this.userService.getPageination(this.page, this.pageSize).subscribe(
    //   res => { 
    //    this.paginationData = res.Data;
    //    this.Count = res.Count;
    //    console.log("get pagination API Error")
    //   },
    //   err => {
    //     console.log("Pagination API error...");
    //   }
    // )

  }

  //Basic Info
  get city(){
    return this.form.get('city')
  }
  get ph_no(){
    return this.form.get('ph_no')
  }
  get emr_contact_per_name(){
    return this.form.get('emr_contact_per_name')
  }
  get emr_contact_per_ph_no(){
    return this.form.get('emr_contact_per_ph_no')
  }
  get perm_addr(){
    return this.form.get('perm_addr')
  }
  get temp_addr(){
    return this.form.get('temp_addr')
  }
  get blood_grp(){
    return this.form.get('blood_grp')
  }
  get addhar_num(){
    return this.form.get('addhar_num')
  }
  get aadhar_soft_copy(){
    return this.form.get('aadhar_soft_copy')
  }
  get uan_num(){
    return this.form.get('uan_num')
  }
  get pan_soft_copy(){
    return this.form.get('pan_soft_copy')
  }
  get passport_num(){
    return this.form.get('passport_num')
  }
  get passport_exp_date(){
    return this.form.get('passport_exp_date')
  }
  get pass_soft_copy(){
    return this.form.get('pass_soft_copy')
  }
  get passport_place_issued(){
    return this.form.get('passport_place_issued')
  }

  //Education Info
  get edu_type(){
    return this.form.get('edu_type')
  }
  get institution_name(){
    return this.form.get('institution_name')
  }
  get passesout_year(){
    return this.form.get('passesout_year')
  }
  get score(){
    return this.form.get('score')
  }

  //Bank Info
  get name_asper_bank(){
    return this.form.get('name_asper_bank')
  }
  get acc_no(){
    return this.form.get('acc_no')
  }
  get bank_name(){
    return this.form.get('bank_name')
  }
  get ifsc_code(){
    return this.form.get('ifsc_code')
  }
  get branch(){
    return this.form.get('branch')
  }
  get acc_type(){
    return this.form.get('acc_type')
  }
  get check_copy(){
    return this.form.get('check_copy')
  }
  //Technical Skills
  get languages(){
    return this.form.get('languages')
  }
  get database(){
    return this.form.get('database')
  }
  get platform(){
    return this.form.get('platform')
  }
  get operating_system(){
    return this.form.get('operating_system')
  }
  
  //Certification
  get certification_name(){
    return this.form.get('certification_name')
  }
  get year(){
    return this.form.get('year')
  }
  get valid_till(){
    return this.form.get('valid_till')
  }
  get record_copy_cert(){
    return this.form.get('record_copy_cert')
  }
  //Previos Employeement Detials
  get name_address(){
    return this.form.get('name_address')
  }
  get doj(){
    return this.form.get('doj')
  }
  get descig_on_join(){
    return this.form.get('descig_on_join')
  }
  get salary_on_join(){
    return this.form.get('salary_on_join')
  }
  get dor(){
    return this.form.get('dor')
  }
  get descig_on_leaving(){
    return this.form.get('descig_on_leaving')
  }
  get salary_on_leaving(){
    return this.form.get('salary_on_leaving')
  }
  get record_copy_emp(){
    return this.form.get('record_copy_emp')
  }
 
  //Famil Detials
  get name(){
    return this.form.get('name')
  }
  get relationship(){
    return this.form.get('relationship')
  }
  get dob(){
    return this.form.get('dob')
  }
  get occupation(){
    return this.form.get('occupation')
  }
  
  //Technical Skills
  addSkillGroup(){
    return this.fb.group({
      languages : ['', Validators.required],
      database : ['', Validators.required],
      platform : ['', Validators.required],
      operating_system : ['', Validators.required],
    })
  }
  // addSkill(){
  //   this.addArray.push(this.addSkillGroup());
  // }
  // removeSkill(index: number){
  //   this.addArray.removeAt(index)
  // }
  get addArray(){
    return <FormArray>this.form.get('techskills')
  }

  //Bank Info
  addBankGroup(){
    return this.fb.group({
      name_asper_bank : ['', [Validators.required,  Validators.pattern('^[a-zA-Z ]*$')]],
      acc_no: ['', Validators.required],
      bank_name: ['', Validators.required],
      ifsc_code: ['', Validators.required],
      branch : ['', Validators.required],
      acc_type : ['', Validators.required],
      check_copy : [''],
    })
  }
  get addBankArray(){
    return <FormArray>this.form.get('bank_details')
  }

  //Education Info
  addEducationGroup(){
    return this.fb.group({
      edu_type : ['', Validators.required],
      institution_name : ['', Validators.required],
      passesout_year : ['', Validators.required],
      score : ['', Validators.required],
    })
  }
  addEducation(){
    this.addEducationArray.push(this.addEducationGroup()) 
  }
  removeEducation(index : any){
    this.addEducationArray.removeAt(index)
  }
  get addEducationArray(){
    return <FormArray>this.form.get('education')
  }
  
  //Certification Info
  addCertificationGroup(){
    return this.fb.group({
      certification_name : [''],
      year : [''],
      valid_till : [''],
      record_copy_cert : [''],
    })
  }
  addCertification(){
    this.addCertificationArray.push(this.addCertificationGroup())
  }
  removeCertification(index : number){
    this.addCertificationArray.removeAt(index)
  }
  get addCertificationArray(){
    return <FormArray>this.form.get('certification')
  }

  // Previous Employeement Info
  addPreviousEmployeementGroup(){
    return this.fb.group({
      name_address : [''],
      doj : [''],
      descig_on_join : [''],
      salary_on_join : [''],
      dor : [''],
      descig_on_leaving : [''],
      salary_on_leaving : [''],
      record_copy_emp : [''],
    })
  }
  addPreviousEmployeement(){
    this.addPreviousEmployeementArray.push(this.addPreviousEmployeementGroup())
  }
  removePreviousEmployeement(index : number){
    this.addPreviousEmployeementArray.removeAt(index)
  }
  get addPreviousEmployeementArray(){
    return <FormArray>this.form.get('previous_employment')
  }

  //Family Details
  addFamilyGroup(){
    return this.fb.group({
      name : ['', [Validators.required,  Validators.pattern('^[a-zA-Z ]*$')]],
      relationship : ['', [Validators.required,  Validators.pattern('^[a-zA-Z ]*$')]],
      dob : ['', Validators.required],
      occupation : ['', Validators.required],
    })
  }
  addFamily(){
    this.addFamilyArray.push(this.addFamilyGroup())
  }
  removeFamily(index : number){
    this.addFamilyArray.removeAt(index);
  }
  get addFamilyArray(){
    return <FormArray>this.form.get('emp_fmly_details')
  }

  onSubmit(){
    console.log("Add Employee details ", this.form.value)
    let postData = this.form.value
    postData.passport_exp_date = postData.passport_exp_date.formatted
    
    postData.emp_id = this.creator
    postData.created_by = this.creator
    let educationInfo = postData['education']
    let certificationInfo = postData['certification']
    let PrevEmpIngo = postData['previous_employment']
    let familyIngo = postData['emp_fmly_details']
  
    for(var i=0;  i < certificationInfo.length; i++){
      if(postData['certification'][i]['year'].formatted){
        postData['certification'][i]['year'] = postData['certification'][i]['year'].date.year + "-" + postData['certification'][i]['year'].date.month
      }else{
        postData['certification'][i]['year'] = "null"
      }
      if(postData['certification'][i]['valid_till'].formatted){
        postData['certification'][i]['valid_till'] = postData['certification'][i]['valid_till'].formatted
      }else{
        postData['certification'][i]['valid_till'] = "null"
      }
    }
    for(var i=0;  i < educationInfo.length; i++){
      if(postData['education'][i]['passesout_year'].formatted){
        postData['education'][i]['passesout_year'] = postData['education'][i]['passesout_year'].date.year + "-" + postData['education'][i]['passesout_year'].date.month
      }else{
        postData['education'][i]['passesout_year'] = "null"
      }
    }
    for(var i=0;  i < PrevEmpIngo.length; i++){
      if(postData['previous_employment'][i]['doj'].formatted){
        postData['previous_employment'][i]['doj'] = postData['previous_employment'][i]['doj'].formatted
      }else{
        postData['previous_employment'][i]['doj'] = "null"
      }
      if(postData['previous_employment'][i]['dor'].formatted){
        postData['previous_employment'][i]['dor'] = postData['previous_employment'][i]['dor'].formatted
      }else{
        postData['previous_employment'][i]['dor'] = "null"
      }
    }
    for(var i=0;  i < familyIngo.length; i++){
      if(postData['emp_fmly_details'][i]['dob'].formatted){
        postData['emp_fmly_details'][i]['dob'] = postData['emp_fmly_details'][i]['dob'].formatted
      }else{
        postData['emp_fmly_details'][i]['dob'] = "null"
      }
    }

    for(var i=0;  i < PrevEmpIngo.length; i++){
      
      postData['previous_employment'][i]['reference_person_name1'] = "Prabu ",
      postData['previous_employment'][i]['reference_person_phno1'] = "9087654321",
      postData['previous_employment'][i]['reference_person_name2'] = "Anand",
      postData['previous_employment'][i]['reference_person_phno2'] = "8907654321",
      postData['previous_employment'][i]['last_working_date'] = "2020-03-13"
    }
    
    postData.bank_details = {
      "bnk_status" : "1",
      "name_asper_bank" : postData['bank_details'][0]['name_asper_bank'],
      "acc_no" : postData['bank_details'][0]['acc_no'],
      "bank_name" : postData['bank_details'][0]['bank_name'],
      "ifsc_code": postData['bank_details'][0]['ifsc_code'],
      "branch": postData['bank_details'][0]['branch'],
      "acc_type": postData['bank_details'][0]['acc_type']
    }

    postData.techskills =[{
			"skilltype": 40,
			"skills": postData['techskills'][0]['languages']
		},
		{
			"skilltype": 41,
			"skills": postData['techskills'][0]['database'] 
		},
		{
			"skilltype": 42,
			"skills": postData['techskills'][0]['platform'] 
		},
		{
			"skilltype": 43,
			"skills": postData['techskills'][0]['operating_system'] 
		}

	],
   postData.profile_picture = "null",
   console.log(postData)

   this.userService.addEmployeeDetails(postData).subscribe(
    res => {
      console.log("Add Employee Details Success ");
      this.addEmployeeErrMsg = "Employee Details Updated"
      this.router.navigate(['employees']);
      
     },
    err => {
      console.log("Add Employee Details Failure ");
      this.addEmployeeErrMsg = "Employee Details Not Updated, Server Error!!!"
      this.router.navigate(['employees']);
    }
  )
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }  

  //Pagination Steps

  // handlePageChange(event): void {
  //   this.page = event;
  //   this.userService.getPageination(this.page, this.pageSize).subscribe(
  //     res => { 
  //       console.log("Handle Page Change method Invoked! "+ res);
  //       this.paginationData = res.Data;
  //     },
  //     err => {
  //       console.log("Pagination handlePageChange method error");
  //     }
  //   )
  // }

  // handlePageSizeChange(event): void {
  //   this.pageSize = event.target.value;
  //   console.log("handle Page size changed! & page size is ", this.pageSize);
  //   this.userService.getPageination(this.page, this.pageSize).subscribe(
  //     res => { 
  //      console.log(res);
  //      console.log(res.Data);
  //      this.paginationData = res.Data;
  //     },
  //     err => {
  //       console.log("Pagination handlePageSizeChange method error");
  //     }
  //   )
  // }
//Check Mail
  // checkEmail(emailAdd){
  //   if(emailAdd){
  //     console.log(emailAdd);
  //     this.userService.checkEmail(emailAdd).subscribe(
  //       res => { 
  //         console.log("Hey You hit the Email verfication API!!");
  //         if(res === true){
  //           this.emailError = "Email is already exists!"
  //           console.log("error success", this.emailError);
  //         }else{
  //           this.emailError = ""
  //           console.log("error failure", this.emailError);
  //         }
  //       },
  //       err => {
  //         console.log("Email verfication API error");
  //       }
  //     );
  //   }else{
  //     console.log("failure");
  //   }
  // }

  // checkPhone(mobileNo){
  //   if(mobileNo){
  //     console.log(mobileNo);
  //     this.userService.checkMobileno(mobileNo).subscribe(
  //       res => { 
  //         console.log("Hey You hit the Mobile Number verfication API!!");
  //         if(res === true){
  //           this.mobileError = "Mobile Number is already exists!"
  //           console.log("error success", this.mobileError);
  //         }else{
  //           this.mobileError = ""
  //           console.log("error failure", this.mobileError);
  //         }
  //       },
  //       err => {
  //         console.log("Mobile number verfication API error");
  //       }
  //     );
  //   }else{
  //     console.log("failure");
  //   }
  // }

  onItemSelect(item: any) {
    console.log('onselect',this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onItemDeSelect(item : any) {
    this.selectedItems = this.selectedItems.filter(item => item.empid != item);
    console.log('onDeselect',this.selectedItems);
  }

  searchEmployee(emp_id){
    
    this.employeeId = emp_id;
    console.log("emp id ", this.employeeId)

    this.jobTitle = "All"
    this.statusE = "All"
    this.startDate = "null"
    this.endDate = "null"
  
    this.loadProjects(this.employeeId, this.jobTitle, this.statusE, this.startDate, this.endDate, this.page, this.pageSize);
  }

  searchJobTitle(jobTitle){    
    this.employeeId = this.employeeId;
    this.jobTitle = this.jobs
    console.log("emp id & job Tile", this.employeeId, this.jobTitle)
    this.statusE = "All"
    this.startDate = "null"
    this.endDate = "null"
  
    this.loadProjects(this.employeeId, this.jobTitle, this.statusE, this.startDate, this.endDate, this.page, this.pageSize);
  }

  searchStatus(status){
    this.employeeId = this.employeeId;
    this.jobTitle = this.jobs
    this.statusE = this.employeeStatusArr
    console.log("emp id & job Tile 7 status ", this.employeeId, this.jobTitle, this.statusE)
    this.statusE = "All"
    this.startDate = "null"
    this.endDate = "null"
  
    this.loadProjects(this.employeeId, this.jobTitle, this.statusE, this.startDate, this.endDate, this.page, this.pageSize);
  }

  searchStartDate(startDate){
    console.log("Start data ", startDate);
    console.log("Start data ", startDate.formatted);
    this.employeeId = this.employeeId;
    this.jobTitle = this.jobs
    this.statusE = this.employeeStatusArr
    console.log("emp id & job Tile 7 status ", this.employeeId, this.jobTitle, this.statusE)
    this.statusE = "All"
    this.startDate = startDate
  }
  searchEndDate(endDate){
    console.log("End Date ", endDate);
    console.log("End Date ", endDate.formatted);
    this.employeeId = this.employeeId;
    this.jobTitle = this.jobs
    this.statusE = this.employeeStatusArr
    console.log("emp id & job Tile 7 status ", this.employeeId, this.jobTitle, this.statusE)
    this.statusE = "All"
    this.endDate = endDate
  
    this.loadProjects(this.employeeId, this.jobTitle, this.statusE, this.startDate, this.endDate, this.page, this.pageSize);

  }

  public empUpt = {};
  public vals = [];

  addReset(){
    let randomnumber = Math.floor(Math.random() * 99);
    let randomNum = String(randomnumber);
    let preValue = "AS10";
    let res = preValue.concat(randomNum)
    //this.createEmp = {'employeeID':randomnumber};
    //console.log(randomnumber)
    this.addEmp = {
      "emp_id": "",
      "f_name": "",
      "l_name": "",
      "role_id":"",
      "gender": "",
      "addr_1": "",
      "addr_2": "",
      "city": "",
      "prof_pic": "",
      "zip_code": "",
      "country_id": "",
      "pass_encrptd": "",
      "doj": "",
      "dob": "",
      "job_title": "",
      "exp_yrs": "",
      "exp_mnths": "",
      "mobile": "",
      "mobile_alt": "",
      "email_offl": "",
      "email_alt": "",
      "scl_name": "",
      "scl_psout_yr": "",
      "clg_name": "",
      "clg_psout_yr": "",
      "status": "1",
      "org_id":"",
      "creator_id":""
    }
    $('#add_employee').modal('show');
  }

  loadProjects(employeeId, jobTitle, status, startData, endData, page, pageSize){
    console.log("Employee Search url ", employeeId, jobTitle, status, startData, endData, page, pageSize);
    this.userService.LoadCurrentEmployeesList(employeeId, jobTitle, status, startData, endData, page, pageSize).subscribe(
      res => {
        this.count = res.Count
        this.paginationData = res.Data;
        console.log("Load Current Employees List success ", res);
      },
      err => {
        console.log("Load Current Employees List failure");
      }
    );
  }

  enableNew(){
    console.log("Clicked New on Radio button ")
    this.isEmployeeId = false;
  }
  enableReplace(){
    console.log("Clicked New on Radio button ")
    this.isEmployeeId = true;
  }

  onEdit(item){
    this.router.navigate(['employees/all-employees/employee-edit'], { queryParams: { 'id': item.emp_id } });
  }

  onDelete(id){
    //console.log("="+id+"=");
    var index = this.rows.findIndex(function(item, i){
      return item.employeeID === id
    });

    //console.log(index);
    if (index > -1) {
        this.rows.splice(index, 1);
        this.srch.splice(index, 1);
    }        
    //console.log(this.rows);
    this.rows = this.rows;
  }

  searchID(val) {
    //console.log(val);
    val = val.toString();
    //console.log(this.srch);
    this.rows.splice(0, this.rows.length);
    //console.log(this.rows);
    let temp = this.srch.filter(function(d) {
      //console.log(d.employeeID);
      d.employeeID = d.employeeID.toString();
      return d.employeeID.toLowerCase().indexOf(val) !== -1 || !val;
    });
    //console.log(temp);
    this.rows.push(...temp);
    //console.log(this.rows);
  }

  searchName(val) {
    //console.log(val);
    //console.log(this.srch);
    this.rows.splice(0, this.rows.length);
    //console.log(this.rows);
    let temp = this.srch.filter(function(d) {
      //console.log(d.userName);
      val = val.toLowerCase();
      return d.userName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    //console.log(temp);
    this.rows.push(...temp);
    //console.log(this.rows);
  }

  searchDesg(val) {
    //console.log(val);
    //console.log(this.srch);
    this.rows.splice(0, this.rows.length);
    //console.log(this.rows);
    let temp = this.srch.filter(function(d) {
      //console.log(d.designation);
      val = val.toLowerCase();
      return d.designation.toLowerCase().indexOf(val) !== -1 || !val;
    });
    //console.log(temp);
    this.rows.push(...temp);
    //console.log(this.rows);
  }

  onFileSelect(e){
    if(e.target.files.length>0){
      const file  = e.target.files[0];
      const reader =  new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) =>{
        
      this.testimgresult = reader.result;
      this.form.patchValue({
        fileSource: file
      });

      console.log("image ", this.testimgresult)
      }
    }
}
BasicDetails(){
  this.isBasicDetails = !this.isBasicDetails
}
BankDetails(){
  this.isBankDetails = !this.isBankDetails
  console.log("BankDetails event ", this.isBankDetails)
}

documentDetails(){
  this.isDocumentDetails = !this.isDocumentDetails
  console.log("documentDetails event ", this.isDocumentDetails)
}

educationDetails(){
  this.isEducationalDetails = !this.isEducationalDetails
  console.log("educationDetails event ", this.isEducationalDetails)
}
technicalSkillsDetails(){
  this.isTechnicalSkillsDetails = !this.isTechnicalSkillsDetails
}
certificationDetails(){
  this.isCertificationDetails = !this.isCertificationDetails
}
preEmpDetails(){
  this.isPreEmpDetails = !this.isPreEmpDetails
}
familyDetails(){
  this.isFamilyDetails = !this.isFamilyDetails
}

}