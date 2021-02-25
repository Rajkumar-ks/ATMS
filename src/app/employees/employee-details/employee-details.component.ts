import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import swal from 'sweetalert2/dist/sweetalert2.js';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  form: FormGroup;  
  isEmployeeId = false;
  updateEmployees =  [];
  testimgresult : any; 
  employeeData : any;
  updateData : any;
  keywordLoc = 'name';
  locData : any;
  creator : any;
  dobDate : object;
  dojDate : object;
  date : object;
  res : any;
  currentMonth : any;
  currentDate : any;
  currentYear : any;

  keywordState = 'name';
  stateData : any;

  keywordCountry = 'name';
  countryData : any;

  business_unit_arr = [];
  resource_type_Arr = [];
  role_type_arr = [];
  level_type_arr = [];
  role_id_arr = [];
  designation_arr = [];
  searchLocation = [];
  searchCountry = [];
  searchState = [];
  prgOwnerRes : string[] = []
  prgEmpRes : string[] = []

  minDate: Date;
  maxDate: Date;

  minDateDOJ: Date;
  maxDateDOJ: Date;

  matcher = new MyErrorStateMatcher();

  today = new Date();

  rows = [];
  public uptEmp:any = [];
  public srch = [];
  
  parseData : any;
  arr : any;
  Status : any;

  countryName : any;
  stateList : "null";
  countrySearch : any;
  stateSearch = "null";
  citySearch = "null";

  constructor(private appService:AppService,
              private router:Router,
              private route:ActivatedRoute,   
              private userService : UserService,
              public fb: FormBuilder) { 

              const currentYear = new Date().getFullYear();
              this.minDate = new Date(currentYear - 100, 0, 1);
              this.maxDate = new Date(currentYear - 18, 11, 31);
          
              this.minDateDOJ = new Date(currentYear , 0, -15);
              this.maxDateDOJ = new Date(currentYear , 0, 15);
              
              this.srch = [...this.rows];
  }
 
  dropdownList = [];
  selectedItems : any;
  updatedEmployees =  [];
  updateEmployeess : any;

  onCountryChangeSearch(search: string) {
    this.countrySearch = search
    console.log(this.countrySearch)
    this.userService.countryList(this.countrySearch, this.stateSearch, this.citySearch).subscribe(
        res => { 
          console.log("country ", res[0])
          let response = res[0]['Country_name']
          
          this.searchCountry = [];
          this.searchCountry.push({"name":response}) 
          this.countryData = this.searchCountry   
          this.countryName = this.countryData[0]['name']        
        },
        err => {
          console.log("Country API error  ", err)
        }
    )
  }

  onStateChangesSearch(search: string){
    this.stateSearch = search
    console.log("country name ", this.countryData, this.countryData[0]['name'])
     this.userService.stateList( this.countryData[0]['name'], this.stateSearch, this.citySearch).subscribe(
        res => {
         
          let response = res[0]['State_name']
          console.log("res[0]['State_name'] ", res[0]['State_name']) 
          this.searchState = [];
          this.searchState.push({"name":response})   
          
          this.stateData = this.searchState
          
          this.stateList = this.stateData[0]['name']
          console.log("state list , this.searchState ", this.stateList, this.searchState)
        },
        err => {
          console.log("err ", err)
        }
    )
  }

  onCityChangesSearch(search: string){
    this.citySearch = search
    console.log("Country, State, city", this.countrySearch, this.stateSearch, search)

    this.userService.cityList(this.countryName, this.stateList, this.citySearch).subscribe(
      res => { 
        console.log("City API Success ", res);
        this.searchLocation = []
        for(var i=0; i<res.length; i++){
         
          this.searchLocation.push({"name":res[i]['City_name']}) 
        }
        this.locData = this.searchLocation;
        console.log("this.locData", this.locData)
      },
      err => {
        console.log("city search error api ")
      }
    )
  }

  ngOnInit() {

    this.userService.dropDownlist().subscribe(
      res => {
        console.log("dropdown list ", res)
     
        let businessUnit = res.bussinessunit
        let businessUnit_Array = businessUnit.split(',')
        this.business_unit_arr = [];
        for(var i = 0; i<businessUnit_Array.length; i++){
          var val = businessUnit_Array[i].split('_')
          this.business_unit_arr.push({"key":val[0],"value":val[1]});
        }
        
        let resourceType = res.resourcetype
        let resourceType_Arr = resourceType.split(',')
        this.resource_type_Arr = [];

        for(var i = 0; i < resourceType_Arr.length; i++){
          var resource = resourceType_Arr[i].split('_')
          this.resource_type_Arr.push({"key":resource[0],"value":resource[1]});
        }

        let roleType = res.roletype
        let roleType_Arr = roleType.split(',')
        this.role_type_arr = []

        for(var i=0; i < roleType_Arr.length; i++){
          var roleTypeid = roleType_Arr[i].split('_')
          this.role_type_arr.push({"key":roleTypeid[0],"value":roleTypeid[1]});
        }

        let levelType = res.level
        let level_type = levelType.split(',')
        this.level_type_arr = []
        for(var i=0; i<level_type.length; i++){
          var level = level_type[i].split('_')
          this.level_type_arr.push({"key":level[0],"value":level[1]});
        }

        let rolesType = res.roles
        let role_type = rolesType.split(',')
        this.role_id_arr = []
        for(var i=0; i<role_type.length; i++){
          var roletypearr = role_type[i].split('_')
          this.role_id_arr.push({"key":roletypearr[0],"value":roletypearr[1]});
        }

        let designation = res.desgination
        let designationType = designation.split(',')
        this.designation_arr = []
        for(var i=0; i<designationType.length; i++){
          var designationid = designationType[i].split('_')
          this.designation_arr.push({"key":designationid[0],"value":designationid[1]});
        }
      },
      err => {
        console.log("Dropdown Response API error");
      }
    );

    this.userService.getProjectEmp().subscribe(
      res => { 
        this.prgEmpRes = res;  
        console.log("API Success for project owner", this.prgEmpRes);
      },
      err => {
        console.log("API Failure for project owner");
      }
    );

    this.userService.getProjectOwner().subscribe(
      res => { 
        this.prgOwnerRes = res;  
        console.log("API Success for Employees", this.prgOwnerRes);
      },
      err => {
        console.log("API Failure for Employees");
      }
    );
    
    this.route.queryParams.subscribe(params => {
      this.parseData = params.id;
      this.uptEmp = [];
    
      if(params.id)
      {
        this.getEmployee(params.id)
      }
      else{
        this.router.navigate(['employees/all-employees']);
      }
    
  });

  this.creator = sessionStorage.getItem('emp_id')

  this.testimgresult = "http://192.168.8.135:8080/Agno/TimeSheet/Users/ProfilePicture/default-user.jpg"

  this.form = this.fb.group({
    'profile_picture' : new FormControl(''),
    'f_name' : new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$')
    ]),
    'l_name' : new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$')
    ]),
    'bussiness_id' : new FormControl('', [
      Validators.required,
      
    ]),
    'resourcetype_id' : new FormControl('', [
      Validators.required,
    ]),
    'descignation_id' : new FormControl('', [
      Validators.required,
    ]),
    'roletype_id' : new FormControl('', [
      Validators.required,
    ]),
    'level_id' : new FormControl('', [
      Validators.required,
    ]),
    'country' : new FormControl('', [
      Validators.required,
    ]),
    'state' : new FormControl('', [
      Validators.required,
    ]),
    'job_location' : new FormControl('', [
      Validators.required,
    ]),
    'gender' : new FormControl('', [
      Validators.required,
    ]),
    'dob' : new FormControl('', [
      Validators.required,
    ]),
    'doj' : new FormControl('', [
      Validators.required,
    ]),
    'per_mail' : new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')
    ]),
    'official_mail' : new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')
    ]),
    'pan_num' : new FormControl('', [
      Validators.required,
      Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}"),
    ]),
    'addhar_num' : new FormControl('', [
      Validators.required,
      Validators.pattern("^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$"),
    ]),
    'rep_emp_id' : new FormControl('', Validators.required),
    'emp_id' : new FormControl(''),
    'rptmgr_id' : new FormControl('', [
      Validators.required,
    ]),
    'status' : new FormControl('', Validators.required),
    'role_id' : new FormControl('', [
      Validators.required,
    ]),
    
  });
}

getEmployee(id){
  this.userService.getEmployeeDetailsById(id).subscribe(
    (result) => {
      
      this.employeeData = result;

      console.log("this.employeeData ", this.employeeData)
      var businessUnit = "" + this.employeeData[0]['business_unit']
      var resourceType = "" + this.employeeData[0]['resource_type']
      var designationType = "" + this.employeeData[0]['designation']
      var roleType = "" + this.employeeData[0]['role_type']
      var levelType = "" + this.employeeData[0]['emp_level']
      var roleTypeId = "" + this.employeeData[0]['role']
      var reportManagerId = "" + this.employeeData[0]['rpt_mgr']
      var employeeId = "" + this.employeeData[0]['emp_id']

      if(this.employeeData[0]['status'] == "1"){
        this.Status = true
      }else{
        this.Status = false
      }

      this.form.patchValue({
        status : this.Status,
        f_name : this.employeeData[0]['f_name'],
        l_name : this.employeeData[0]['l_name'],
        bussiness_id : businessUnit,
        resourcetype_id : resourceType,
        descignation_id : designationType,
        roletype_id : roleType,
        level_id : levelType,
        dob : this.convert(this.employeeData[0]['dob']),
        doj : this.convert(this.employeeData[0]['doj']),
        country : this.employeeData[0]['country'],
        state : this.employeeData[0]['state'],
        job_location : this.employeeData[0]['job_location'],
        pan_num : this.employeeData[0]['pan_num'],
        addhar_num : this.employeeData[0]['addhar_num'],
        per_mail : this.employeeData[0]['per_mail'],
        official_mail : this.employeeData[0]['official_mail'],
        gender : this.employeeData[0]['gender'],
        rep_emp_id : this.employeeData[0]['rep_emp_id'],
        role_id : roleTypeId,
        rptmgr_id : reportManagerId,
        emp_id : employeeId,
      });
      
    },
    err => {
      console.log("Get employee by id API error !");
    }
  )
}
    
  get profile_picture(){
    return this.form.get('profile_picture')
  }
  get f_name(){
    return this.form.get('f_name')
  }
  get l_name(){
    return this.form.get('l_name')
  }
  get bussiness_id(){
    return this.form.get('bussiness_id')
  }
  get resourcetype_id(){
    return this.form.get('resourcetype_id')
  }
  get descignation_id(){
    return this.form.get('descignation_id')
  }
  get roletype_id(){
    return this.form.get('roletype_id')
  }
  get job_location(){
    return this.form.get('job_location')
  }
  get level_id(){
    return this.form.get('level_id')
  }
  get state(){
    return this.form.get('state')
  }
  get country(){
    return this.form.get('country')
  }
  get gender(){
    return this.form.get('gender')
  }
  get dob(){
    return this.form.get('dob')
  }
  get doj(){
    return this.form.get('doj')
  }
  get per_mail(){
    return this.form.get('per_mail')
  }
  get official_mail(){
    return this.form.get('official_mail')
  }
  get pan_num(){
    return this.form.get('pan_num')
  }
  get addhar_num(){
    return this.form.get('addhar_num')
  }
  get rep_emp_id(){
    return this.form.get('rep_emp_id')
  }
  get emp_id(){
    return this.form.get('emp_id')
  }
  get rptmgr_id(){
    return this.form.get('rptmgr_id')
  }
  get status(){
    return this.form.get('status')
  }
  get role_id(){
    return this.form.get('role_id')
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
      
      console.log("image", this.testimgresult);

      this.userService.uploadImg( this.testimgresult).subscribe(
        res => { 
      
          console.log("image saved to service file!");
        },
        err => {
          console.log("image not saved to service file!");
        }
      );
      }
    }
  }
  
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

    enableNew(){
      console.log("Clicked New on Radio button ")
      this.isEmployeeId = false;
    }
    enableReplace(){
      console.log("Clicked New on Radio button ")
      this.isEmployeeId = true;
    }

    selectEvent(item) {
      // do something with selected item
    }
  
    onChangeSearch(search: string) {
  
    }
  
    onFocused(e) {
      // do something
    }

    updateSubmit(){
      
      this.updateData = this.form.value

      this.updateData.profile_picture = "null"

      this.updateData.created_by = this.creator;

      this.updateData.RptMrg = this.updateData.rptmgr_id

      if(this.updateData.emp_id === ""){
        this.updateData.emp_id =  this.parseData
      }else{
        this.updateData.emp_id = this.updateData.emp_id
      }

      if(this.updateData.rep_emp_id === "new"){
        this.enableNew();
      }else{
        this.enableReplace();
      }

      if(this.updateData.status === true){
        this.updateData.status = "1";
      }else{
        this.updateData.status = "0";
      }

      if(this.updateData.dob){
        this.updateData.dob = this.convert(this.updateData.dob)
      }else{
        this.updateData.dob = this.updateData.dob
      }
    
      if(this.updateData.doj){
        this.updateData.doj = this.convert(this.updateData.doj)
      }else{
        this.updateData.doj = this.updateData.doj
      }

      console.log("Update Data", this.form.value);
      this.userService.updateHREmployeeDetails(this.updateData).subscribe(
        res => {
          console.log("update HR Employee Details Success ");
          swal.fire({
            title: "Employee Updated!",
            confirmButtonText: "Ok",
          });
          this.router.navigate(['employees']);
         },
        err => {
          console.log("update HR Employee Details Failure ");
          swal.fire({
            title: "Employee Not Updated. Try Again",
            confirmButtonText: "Ok",
          });
          this.router.navigate(['employees']);
        }
      )
    }

    convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

    getDate(date){
      if(date === ''){
        date = ''
      }else {
        let passesout_year = date
        let datePass = new Date(passesout_year).toLocaleDateString()
        this.res = datePass.split("/");
        for(var i=0; i<this.res.length; i++){
          this.currentMonth = this.res[0]
          this.currentDate = this.res[1]
          this.currentYear = this.res[2]
        }
      this.date = { date: { year: this.currentYear, month: this.currentMonth, day: this.currentDate }};
      return this.date;
      }
    }
  }
  