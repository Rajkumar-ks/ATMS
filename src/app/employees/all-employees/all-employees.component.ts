import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import * as _ from 'lodash';
import swal from 'sweetalert2/dist/sweetalert2.js';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
declare const $: any;

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AllEmployeesComponent implements OnInit {

  form: FormGroup;  

  public allEmployees:boolean = true;
  
  dateOfBirth : any;
  dateOfjoining :any;

  creator :any;

  minDate: Date;
  maxDate: Date;

  minDateDOJ: Date;
  maxDateDOJ: Date;

  isEmployeeId = false;

  business_unit_arr = [];
  resource_type_Arr = [];
  role_type_arr = [];
  level_type_arr = [];
  role_id_arr = [];
  designation_arr = [];
  search_arr = [];
  searchLocation = [];
  searchCountry = [];
  searchState = [];
  countryData : any;
  countryName : any;
  stateData : any;
  keywordState = 'name';
  stateList : "null";
  locData :any;
  keywordLoc = 'name';
  prgOwnerRes : string[] = []
  prgEmpRes : string[] = []
  countrySearch : any;
  keywordCountry = 'name';
  stateSearch = "null";
  citySearch = "null";
  testimgresult : any; 

  rows = [];
  selectedValue : string;

  page : Number = 1;
  pageSize = 5;
  pageSizes = [3,10,15];
  Count : Number;
  paginationData : string;

  constructor(
    private router:Router,
    private userService : UserService,
    public fb: FormBuilder
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 18, 11, 31);

    this.minDateDOJ = new Date(currentYear , 0, -15);
    this.maxDateDOJ = new Date(currentYear , 0, 15);
   }

   matcher = new MyErrorStateMatcher();

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

  onFocused(e) {
    // do something
  }

  selectEvent(item) {
    // do something with selected item
  }

   ngOnInit() {

    this.getPagination();

    this.creator = sessionStorage.getItem('emp_id')

    this.testimgresult = "http://192.168.8.135:8080/Agno/TimeSheet/Users/ProfilePicture/default-user.jpg"

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

    this.userService.dropDownlist().subscribe(
      res => {
        console.log("dropdown list ", res, JSON.stringify(res))

          let businessUnit = res.bussinessunit
          let businessUnit_Array = businessUnit.split(',')
          this.business_unit_arr = [];
          for(var i = 0; i<businessUnit_Array.length; i++){
            var val = businessUnit_Array[i].split('_')
            this.business_unit_arr.push({"key":val[0],"value":val[1]});
          }
          console.log('this.business_unit_arr ', this.business_unit_arr)
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

    this.form = this.fb.group({
      'status' : new FormControl(true, Validators.required),
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
      'per_mail' : new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      'official_mail' : new FormControl('', [
        Validators.required,
        Validators.email,
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
      'doj' : new FormControl('', [
        Validators.required,
      ]), 
      'role_id' : new FormControl('', Validators.required), 
      'emp_id' : new FormControl(''), 
      'rptmgr_id' : new FormControl('', [
        Validators.required,
      ]),
    })

  }

  getPagination(): void{
    this.userService.getPageination(this.page, this.pageSize).subscribe(
      res => { 
        console.log("pagination res ", JSON.stringify(res));
       this.paginationData = res.Data;
       this.Count = res.Count;
       console.log("Pagination Data ", this.paginationData)
      },
      err => {
        console.log("Pagination API error...");
      }
    )
  }

  get profile_picture(){
    return this.form.get('profile_picture')
  }
  get status(){
    return this.form.get('status')
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
  get level_id(){
    return this.form.get('level_id')
  }
  get country(){
    return this.form.get('country')
  }
  get state(){
    return this.form.get('state')
  }
  get job_location(){
    return this.form.get('job_location')
  }
  get gender(){
    return this.form.get('gender')
  }
  get dob(){
    return this.form.get('dob')
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
  get doj(){
    return this.form.get('doj')
  }
  get role_id(){
    return this.form.get('role_id')
  }
  get emp_id(){
    return this.form.get('emp_id')
  }
  get rptmgr_id(){
    return this.form.get('rptmgr_id')
  }
  
  handlePageChange(event): void {
    this.page = event;
    this.userService.getPageination(this.page, this.pageSize).subscribe(
      res => { 
        console.log("Handle Page Change method Invoked! "+ res);
        this.paginationData = res.Data;
      },
      err => {
        console.log("Pagination handlePageChange method error");
      }
    )
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    console.log("handle Page size changed! & page size is ", this.pageSize);
    this.userService.getPageination(this.page, this.pageSize).subscribe(
      res => { 
       console.log(res);
       console.log(res.Data);
       this.paginationData = res.Data;
      },
      err => {
        console.log("Pagination handlePageSizeChange method error");
      }
    )
  }

  addReset(){
    $('#add_employee').modal('show');
  }
   
  addEmployee(){
    this.form.value.doj = this.convert(this.form.value.doj)
    this.form.value.dob = this.convert(this.form.value.dob)

    let postData = this.form.value
    if(postData.country.name){
      postData.country = postData.country.name
    }else{
      postData.country = postData.country
    }

    if(postData.job_location.name){
      postData.job_location = postData.job_location.name
    }else{
      postData.job_location = postData.job_location
    }

    if(postData.state.name){
      postData.state = postData.state.name
    }else{
      postData.state = postData.state
    }
   
    postData.profile_picture = "null"
  
    if(postData.status === true){
      postData.status = '1'
    }else{
      postData.status = '0'
    }

    postData.created_by = this.creator;

    if(postData.emp_id = ""){
      postData.emp_id = "null";
    }else{
      postData.emp_id = postData.emp_id;
    }
    
    postData.master_status = "1";

    postData.ph_no = "nil"
    postData.temp_addr = "nil"
    postData.perm_addr = "nil"
    postData.city = "nil"
    postData.emr_contact_per_name = "nil"
    postData.emr_contact_per_ph_no = "nil"
    postData.blood_grp = "nil"
    postData.passport_num = "nil"
    postData.passport_exp_date = "null"
    postData.passport_place_issued = "nil"
    postData.uan_num = "nil"

    if(postData.descignation_id.name){
      postData.descignation_id = postData.descignation_id.name
    }else{
      postData.descignation_id = postData.descignation_id
    }

    if(postData.rep_emp_id === 'New'){
      postData.rep_emp_id = "new"
    }else{
      postData.emp_id = postData.emp_id.id
    }

    console.log("Add Employee Request JSON Data ", postData);

    this.userService.saveEmployeeDetails(postData).subscribe(
      res => {
        console.log("Save Employees success ", JSON.stringify(res));
        this.form.reset();
        swal.fire({
          title: "Employee Added!",
          confirmButtonText: "Ok",
        });
        this.router.navigate(['employees']);
        this.ngOnInit();
      },
      err => {
        console.log("Save Employees Failure ", err, err.status)
        // swal.fire({
        //   title: "Employee Not Added. Try Again!",
        //   confirmButtonText: "Ok",
        // });
      }
    );
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  enableNew(){
    this.isEmployeeId = false;
  }
  enableReplace(){
    this.isEmployeeId = true;
  }
  onEdit(item){
    this.router.navigate(['employees/all-employees/edit'], { queryParams: { 'id': item.emp_id } });
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

      this.userService.uploadImg( this.testimgresult).subscribe(
        res => { 
          console.log("image saved to service file!");
        },
        err => {
          console.log("image not saved to service file!");
        }
      );

      console.log("image ", this.testimgresult)
      }
    }
}
}

