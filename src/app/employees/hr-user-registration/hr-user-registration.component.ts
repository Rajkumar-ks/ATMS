import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-hr-user-registration',
  templateUrl: './hr-user-registration.component.html',
  styleUrls: ['./hr-user-registration.component.css']
})
export class HrUserRegistrationComponent implements OnInit {

  form : FormGroup;

  isEmployeeId = false;
  testimgresult : any; 

  keyword = 'name';
  data = [
     {
       id: 1,
       name: 'Software Engineer'
     },
     {
       id: 2,
       name: 'Technical Consoltant'
     }
  ];

  keywordId = 'name';
  idData = [
     {
       id: 1,
       name: 'Rajkumar'
     },
     {
       id: 2,
       name: 'Kishor Kumar'
     }
  ];

  public myDatePickerOptions1: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '28px',
    disableUntil: {year: 1980, month: 1, day: 1},
    disableSince: {year: 2020, month: 12 , day: 30}
  };

  public myDatePickerOptions2: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '28px',
    disableUntil: {year: 2020, month: 1, day: 1},
  };

  business_unit_arr = [];
  resource_type_Arr = [];
  role_type_arr = [];
  level_type_arr = [];

  constructor(public fb: FormBuilder,
              private router:Router,
              private userService : UserService) { }

  ngOnInit() {

    this.userService.dropDownlist().subscribe(
      res => { 
       console.log("Dropdown Response ", res);

       let businessUnit = res.bussinessunit
       let businessUnit_Array = businessUnit.split(',')
       console.log("business Unit ", businessUnit_Array);
       
       for(var i = 0; i<businessUnit_Array.length; i++){
         this.business_unit_arr.push(businessUnit_Array[i].split('_'));
       }

       let resourceType = res.resourcetype
       let resourceType_Arr = resourceType.split(',')

       for(var i = 0; i < resourceType_Arr.length; i++){
        this.resource_type_Arr.push(resourceType_Arr[i].split('_'));
       }

       let roleType = res.roletype
       let roleType_Arr = roleType.split(',')

       for(var i=0; i < roleType_Arr.length; i++){
        this.role_type_arr.push(roleType_Arr[i].split('_'));
       }

       let levelType = res.level
       let level_type = levelType.split(',')

       for(var i=0; i<level_type.length; i++){
         this.level_type_arr.push(level_type[i].split('_'));
       }

      },
      err => {
        console.log("Dropdown Response API error");
      }
    );

    this.testimgresult = "http://192.168.8.135:8080/Agno/TimeSheet/Users/ProfilePicture/default-user.jpg"

    this.form = this.fb.group({
      'prof_img' : new FormControl(''),
      'f_name' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'l_name' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'business_unit' : new FormControl('', [
        Validators.required,
        
      ]),
      'resource_type' : new FormControl('', [
        Validators.required,
      ]),
      'designation' : new FormControl('', [
        Validators.required,
      ]),
      'role_type' : new FormControl('', [
        Validators.required,
      ]),
      'job_location' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'level' : new FormControl('', [
        Validators.required,
        
      ]),
      'state' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'country' : new FormControl('', [
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
      'personal_mail' : new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')
      ]),
      'official_mail' : new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')
      ]),
      'pan_number' : new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'aadhar_number' : new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ]),
      'resource_type_request' : new FormControl('', [
        Validators.required,
      ]),
      'emp_id' : new FormControl('', [
        Validators.required,
      ]),
      'reporting_manager' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
    });
  }
  
  get prof_img(){
    return this.form.get('prof_img')
  }
  get f_name(){
    return this.form.get('f_name')
  }
  get l_name(){
    return this.form.get('l_name')
  }
  get business_unit(){
    return this.form.get('business_unit')
  }
  get resource_type(){
    return this.form.get('resource_type')
  }
  get designation(){
    return this.form.get('designation')
  }
  get role_type(){
    return this.form.get('role_type')
  }
  get job_location(){
    return this.form.get('job_location')
  }
  get level(){
    return this.form.get('level')
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
  get personal_mail(){
    return this.form.get('personal_mail')
  }
  get official_mail(){
    return this.form.get('official_mail')
  }
  get pan_number(){
    return this.form.get('pan_number')
  }
  get aadhar_number(){
    return this.form.get('aadhar_number')
  }
  get resource_type_request(){
    return this.form.get('resource_type_request')
  }
  get emp_id(){
    return this.form.get('emp_id')
  }
  get reporting_manager(){
    return this.form.get('reporting_manager')
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }  

  enableNew(){
    console.log("Clicked New on Radio button ")
    this.isEmployeeId = false;
  }
  enableReplace(){
    console.log("Clicked New on Radio button ")
    this.isEmployeeId = true;
  }

  // ng - autocomplete

  selectEvent(item) {
    // do something with selected item
  }
 
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
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

  addSubmit(){
    let postData = this.form.value
    console.log("Actual Post Data ", postData);

    if(postData.designation.name){
      postData.designation = postData.designation.name
      console.log(postData.designation);
    }else{
      postData.designation = postData.designation
      console.log(postData.designation);
    }
  
    postData.dob = postData.dob.formatted
    postData.doj = postData.doj.formatted

    if(postData.resource_type_request === 'New'){
      postData.emp_id = "New"
      console.log("Emp Id New", postData.emp_id);
      
    }else{
      postData.emp_id = postData.emp_id.id
      console.log("Emp Id Replace", postData.emp_id);
    }

    console.log("post Data ", postData);
    
  }

}
