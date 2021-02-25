import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { UserService } from 'src/app/service/user.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import * as _ from 'lodash';
import swal from 'sweetalert2/dist/sweetalert2.js';

declare const $: any;
@Component({
  selector: 'app-employee-add-list-details',
  templateUrl: './employee-add-list-details.component.html',
  styleUrls: ['./employee-add-list-details.component.css']
})

export class EmployeeAddListDetailsComponent implements OnInit{

  form: FormGroup;  

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

  lang : any;
  os : any;
  plat : any;
  db : any;
  uni_a : any;
  uni_b : any;
  uni_c : any;
  uni_d : any;

  yearId : any;
  monthId  : any;
  
  isEmployeeId = true;
  isBasicDetails = true;
  isBankDetails = false;
  isDocumentDetails = false;
  isEducationalDetails = false;
  isTechnicalSkillsDetails = false;
  isCertificationDetails = false;
  isPreEmpDetails = false;
  isFamilyDetails = false;

  testimgresult : any; 

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

  parseData : any;
  public uptEmp:any = [];
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

  employeeDetails : any;
  totalRecords : string
  page : Number = 1;
  pageSize = 5;
  pageSizes = [5,10,15];
  Count : Number;
  employee : any;
  tmp = [];
  job = [];
  
  educationInfo : any;
  certificationInfo : any;
  previousEmploymentInfo : any;
  familyInfo : any;
  skillInfo : any;
  res : any;
  currentMonth : any;
  currentDate : any;
  currentYear : any;
  passportExpireDate : object;
  passesoutYearDate : object;
  passedoutYearDate : any;
  validTill : object;
  certificationYear : object;
  familyDob : object;
  employeeDoj : object;
  employeeDor : object;
  dateObject : object;

  minDate: Date;
  maxDate: Date;

  constructor(private appService:AppService,
              private router:Router,
              private route:ActivatedRoute, 
              private userService : UserService,
              public fb: FormBuilder) { 
                
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
            
    this.rows = appService.employees;
    this.srch = [...this.rows];
    this.modules = appService.employee_modules;
   
    this.data = new Array<any>();
  }
  
  ngOnInit() {

    this.creator = sessionStorage.getItem("emp_id")
    this.firstName = sessionStorage.getItem("firstname")
    this.lastName = sessionStorage.getItem("lastname")

    this.route.queryParams.subscribe(params => {
      this.parseData = params.id;
      this.uptEmp = [];
    
      if(params.id)
      {
        console.log("current employee id d", this.parseData)
        this.userService.getEmployeeById(this.parseData).subscribe(
          (result) => {
           
            this.employeeDetails = result;
            console.log("employeeDetails ", this.employeeDetails);
            console.log("Acc_no ", this.employeeDetails[0]['Acc_no']);
            
            if( this.employeeDetails[0]['city'] === 'nil'){
              this.employeeDetails[0]['city'] = ''
            }

            if(this.employeeDetails[0]['techskills'][0]['skills'] === "null"){
              this.lang = "null"
            }else{
              this.lang = this.employeeDetails[0]['techskills'][0]['skills']
              this.uni_a = this.employeeDetails[0]['techskills'][0]['skill_unique_id']
            }

            if(this.employeeDetails[0]['techskills'][1]['skills'] === "null"){
              this.db = "null"
            }else{
              this.db = this.employeeDetails[0]['techskills'][1]['skills']
              this.uni_b = this.employeeDetails[0]['techskills'][1]['skill_unique_id']
            }

            if(this.employeeDetails[0]['techskills'][2]['skills'] === "null"){
              this.plat = "null"
            }else{
              this.plat = this.employeeDetails[0]['techskills'][2]['skills']
              this.uni_c = this.employeeDetails[0]['techskills'][2]['skill_unique_id']
            }

            if(this.employeeDetails[0]['techskills'][3]['skills'] === "null"){
              this.os = "null"
            }else{
              this.os = this.employeeDetails[0]['techskills'][3]['skills']
              this.uni_d = this.employeeDetails[0]['techskills'][3]['skill_unique_id']
            }
      
            this.educationInfo = (this.employeeDetails[0]['education']=="null")?[]:this.employeeDetails[0]['education'];
            this.certificationInfo = (this.employeeDetails[0]['certification']=="null")?[]:this.employeeDetails[0]['certification'];
            this.previousEmploymentInfo = (this.employeeDetails[0]['previous_employment']=="null")?[]:this.employeeDetails[0]['previous_employment'];
            this.familyInfo = (this.employeeDetails[0]['emp_fmly_details']=="null")?[]:this.employeeDetails[0]['emp_fmly_details'];
            this.skillInfo = (this.employeeDetails[0]['techskills']=="null")?[]:this.employeeDetails[0]['techskills'];
          

            for(var i=0;i<this.employeeDetails[0]['education'].length;i++){

              if(this.employeeDetails[0]['education'][i]['passesout_year'] === "null" || this.employeeDetails[0]['education'][i]['passesout_year'] === ""){
                this.employeeDetails[0]['education'][i]['passesout_year'] = ""
              }else{
                this.employeeDetails[0]['education'][i]['passesout_year'] = this.employeeDetails[0]['education'][i]['passesout_year']
              }
              
              this.employeeDetails[0]['education'][i]['edu_unique_id'] = this.employeeDetails[0]['education'][i]['edu_unique_id']
              let data = this.employeeDetails[0]['education'][i];
              
              this.addEducationArray.push(this.addEducationArrGroup(data));
            }

            for(var i=0;i<this.certificationInfo.length;i++){

              if(this.employeeDetails[0]['certification'][i]['valid_till'] === "null"){
                this.employeeDetails[0]['certification'][i]['valid_till'] = { date: { year: "", month: "", day: "" }}
              }else{
                this.validTill = this.getDate(this.employeeDetails[0]['certification'][i]['valid_till'])
                this.employeeDetails[0]['certification'][i]['valid_till'] = this.validTill
              }

              if(this.employeeDetails[0]['certification'][i]['year'] === "null"){
                this.employeeDetails[0]['certification'][i]['year'] = { date: { year: "", month: "", day: "" }}
              }else{
                this.certificationYear = this.getDate(this.employeeDetails[0]['certification'][i]['year'])
                this.employeeDetails[0]['certification'][i]['year'] = this.certificationYear 
              }
              
              this.employeeDetails[0]['certification'][i]['cert_unique_id'] = this.employeeDetails[0]['certification'][i]['cert_unique_id']

              let data = this.employeeDetails[0]['certification'][i];
              this.addCertificationArray.push(this.addCertificationArrGroup(data));
            }

            for(var i=0;i<this.previousEmploymentInfo.length;i++){
              if(this.employeeDetails[0]['previous_employment'][i]['doj'] === "null"){
                this.employeeDetails[0]['previous_employment'][i]['doj'] = { date: { year: "", month: "", day: "" }}
              }else{
                this.employeeDoj = this.getDate(this.employeeDetails[0]['previous_employment'][i]['doj'])
                this.employeeDetails[0]['previous_employment'][i]['doj'] = this.employeeDoj  
              }
             
              this.employeeDetails[0]['previous_employment'][i]['emplyment_unique_id'] = this.employeeDetails[0]['previous_employment'][i]['emplyment_unique_id']
             
              if(this.employeeDetails[0]['previous_employment'][i]['dor'] === "null"){
                this.employeeDetails[0]['previous_employment'][i]['dor'] = { date: { year: "", month: "", day: "" }}
              }else{
                this.employeeDor = this.getDate(this.employeeDetails[0]['previous_employment'][i]['dor'])
                this.employeeDetails[0]['previous_employment'][i]['dor'] = this.employeeDor  
              }
           
              let data=this.previousEmploymentInfo[i];
              this.addPreviousEmployeementArray.push(this.addPreviousEmployeementArrGroup(data));
            }

            for(var i=0;i<this.familyInfo.length;i++){
              
              if(this.employeeDetails[0]['emp_fmly_details'][i]['dob'] === 'null'){
                this.familyDob = { date: { year: "", month: "", day: "" }}
              }else{
                this.familyDob = this.getDate(this.employeeDetails[0]['emp_fmly_details'][0]['dob'])
                this.employeeDetails[0]['emp_fmly_details'][i]['dob'] = this.familyDob  
              }
              this.employeeDetails[0]['emp_fmly_details'][i]['fmly_unique_id'] = this.employeeDetails[0]['emp_fmly_details'][i]['fmly_unique_id']

              let data=this.familyInfo[i];
              this.addFamilyArray.push(this.addFamilyArrGroup(data));
            }

            if(this.employeeDetails[0]['passport_exp_date'] === 'null'){
              this.passportExpireDate = { date: { year: "", month: "", day: "" }}
            }else{
              this.passportExpireDate = this.getDate(this.employeeDetails[0]['passport_exp_date'])
            }
                   
          },
          err => {
            console.log("Get employee by id API error !");
          }
        )
      }
      else{
        this.router.navigate(['employees/all-employees']);
      }
    });


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

    this.userService.getPageination(this.page, this.pageSize).subscribe(
      res => { 
       this.paginationData = res.Data;
       this.Count = res.Count;
       console.log("get pagination API Error")
      },
      err => {
        console.log("Pagination API error...");
      }
    )
  }

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
    this.dateObject = { date: { year: this.currentYear, month: this.currentMonth, day: this.currentDate }};
    return this.date;
    }
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
  addEducationArrGroup(data){
    return this.fb.group({
      edu_type : data.edu_type,
      institution_name : data.institution_name,
      passesout_year : data.passesout_year,
      score : data.score,
      edu_unique_id : data.edu_unique_id
    })
  }

  addEducationGroup(){
    return this.fb.group({
      edu_type : ['', Validators.required],
      institution_name : ['', Validators.required],
      passesout_year : ['', Validators.required],
      score : ['', Validators.required],
      edu_unique_id : ['']
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
  addCertificationArrGroup(data){
    return this.fb.group({
      certification_name : data.certification_name,
      year : data.year,
      valid_till : data.valid_till ,
      record_copy_cert : data.record_copy_cert,
      cert_unique_id : data.cert_unique_id
    })
  }

  addCertificationGroup(){
    return this.fb.group({
      certification_name : [''],
      year : [''],
      valid_till : [''],
      record_copy_cert : [''],
      cert_unique_id : ['']
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
  addPreviousEmployeementArrGroup(data){
    console.log("employment data", data)
    return this.fb.group({
      name_address : data.name_address,
      doj : data.doj,
      descig_on_join : data.descig_on_join,
      salary_on_join : data.salary_on_join,
      dor : data.dor,
      descig_on_leaving : data.descig_on_leaving,
      salary_on_leaving : data.salary_on_leaving,
      record_copy_emp : data.record_copy_emp,
      emplyment_unique_id : data.emplyment_unique_id
    })
  }

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
      emplyment_unique_id : ['']
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
  addFamilyArrGroup(data){
    return this.fb.group({
      name : data.name,
      relationship : data.relationship,
      dob : data.dob,
      occupation : data.occupation,
      fmly_unique_id : data.fmly_unique_id
    })
  }

  addFamilyGroup(){
    return this.fb.group({
      name : ['', [Validators.required,  Validators.pattern('^[a-zA-Z ]*$')]],
      relationship : ['', [Validators.required,  Validators.pattern('^[a-zA-Z ]*$')]],
      dob : ['', Validators.required],
      occupation : ['', Validators.required],
      fmly_unique_id : ['']
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
    console.log(this.form.value)

    let editEmployeeData = this.form.value

    console.log("editEmployeeData ", editEmployeeData)

    let technical_skills = [
      {
        skills : editEmployeeData.techskills[0]['languages'],
        skill_unique_id : this.uni_a,
        skilltype : "40"
      },
      {
        skills : editEmployeeData.techskills[0]['database'],
        skill_unique_id : this.uni_b,
        skilltype : "41"
      },
      {
        skills : editEmployeeData.techskills[0]['platform'],
        skill_unique_id : this.uni_c,
        skilltype : "42"
      },
      {
        skills : editEmployeeData.techskills[0]['operating_system'],
        skill_unique_id : this.uni_d,
        skilltype : "43"
      },
    ]

    editEmployeeData.techskills = technical_skills

    if(editEmployeeData.passport_exp_date){
      editEmployeeData.passport_exp_date = this.convert(editEmployeeData.passport_exp_date)
    }else{
      editEmployeeData.passport_exp_date = ""
    }

   //Education info
  for(var i=0; i<editEmployeeData.education.length; i++){
    if((editEmployeeData.education[i]['edu_type'] === 'null' || editEmployeeData.education[i]['edu_type'] === '') && (editEmployeeData.education[i]['institution_name'] === 'null' || editEmployeeData.education[i]['institution_name'] === '') && (editEmployeeData.education[i]['passesout_year'] === 'null' || editEmployeeData.education[i]['passesout_year'] === '') && (editEmployeeData.education[i]['score'] === 'null' || editEmployeeData.education[i]['score'] === '') && (editEmployeeData.education[i]['edu_unique_id'] === 'null' || editEmployeeData.education[i]['edu_unique_id'] === '')){
      delete editEmployeeData.education[i];
    }else{
      if(editEmployeeData.education[i]['passesout_year'].formatted){
        editEmployeeData.education[i]['passesout_year'] = editEmployeeData.education[i]['passesout_year'].date['year'] + "-" + editEmployeeData.education[i]['passesout_year'].date['month']
      }else if(editEmployeeData.education[i]['passesout_year'].date){
        editEmployeeData.education[i]['passesout_year'] = editEmployeeData.education[i]['passesout_year'].date['year'] + "-" +editEmployeeData.education[i]['passesout_year'].date['month']
      }else{
        editEmployeeData.education[i]['passesout_year'] =  editEmployeeData.education[i]['passesout_year']
      }
    }
  }

//Certification Info
for(var i=0; i<editEmployeeData.certification.length; i++){

  if((editEmployeeData.certification[i]['certification_name'] === 'null' || editEmployeeData.certification[i]['certification_name'] === '') && (editEmployeeData.certification[i]['year'] === 'null' || editEmployeeData.certification[i]['year'] === '') && (editEmployeeData.certification[i]['valid_till'] === 'null' || editEmployeeData.certification[i]['valid_till'] === '') && (editEmployeeData.certification[i]['record_copy_cert'] === 'null' || editEmployeeData.certification[i]['record_copy_cert'] === '') && (editEmployeeData.certification[i]['cert_unique_id'] === 'null' || editEmployeeData.certification[i]['cert_unique_id'] === '')){
    delete editEmployeeData.certification[i];
  }else{

    if(editEmployeeData.certification[i]['year'].formatted){
      editEmployeeData.certification[i]['year'] = editEmployeeData.certification[i]['year'].date['year'] + "-" + editEmployeeData.certification[i]['year'].date['month']
    }else if(editEmployeeData.certification[i]['year'].date){
      editEmployeeData.certification[i]['year'] = editEmployeeData.certification[i]['year'].date['year'] + "-" +editEmployeeData.certification[i]['year'].date['month']
    }else{
      editEmployeeData.certification[i]['year'] = editEmployeeData.certification[i]['year']
    }

    if(editEmployeeData.certification[i]['valid_till']){
      editEmployeeData.certification[i]['valid_till'] = this.convert(editEmployeeData.certification[i]['valid_till'])
    }else{
      editEmployeeData.certification[i]['valid_till'] = ""
    }    
  }
}

//Family Info
for(var i=0; i<editEmployeeData.emp_fmly_details.length; i++){
  if((editEmployeeData.emp_fmly_details[i]['name'] === 'null' || editEmployeeData.emp_fmly_details[i]['name'] === '') && (editEmployeeData.emp_fmly_details[i]['relationship'] === 'null' || editEmployeeData.emp_fmly_details[i]['relationship'] === '') && (editEmployeeData.emp_fmly_details[i]['dob'] === 'null' || editEmployeeData.emp_fmly_details[i]['dob'] === '') && (editEmployeeData.emp_fmly_details[i]['occupation'] === 'null' || editEmployeeData.emp_fmly_details[i]['occupation'] === '') && (editEmployeeData.emp_fmly_details[i]['fmly_unique_id'] === 'null' || editEmployeeData.emp_fmly_details[i]['fmly_unique_id'] === '')){
    delete editEmployeeData.emp_fmly_details[i];
  }else{
   if(editEmployeeData.emp_fmly_details[i]['dob'].formatted){
      editEmployeeData.emp_fmly_details[i]['dob'] = editEmployeeData.emp_fmly_details[i]['dob'].date['year'] + "-" + editEmployeeData.emp_fmly_details[i]['dob'].date['month'] + "-" + editEmployeeData.emp_fmly_details[i]['dob'].date['day']
    }else if(editEmployeeData.emp_fmly_details[i]['dob'].date){
      editEmployeeData.emp_fmly_details[i]['dob'] = editEmployeeData.emp_fmly_details[i]['dob'].date['year'] + "-" +editEmployeeData.emp_fmly_details[i]['dob'].date['month'] + "-" + editEmployeeData.emp_fmly_details[i]['dob'].date['day']
    }else{
      editEmployeeData.emp_fmly_details[i]['dob'] = editEmployeeData.emp_fmly_details[i]['dob']
    }
  }
}
editEmployeeData.bank_details = {
  "bnk_status" : "1",
  "name_asper_bank" : editEmployeeData['bank_details'][0]['name_asper_bank'],
  "acc_no" : editEmployeeData['bank_details'][0]['acc_no'],
  "bank_name" : editEmployeeData['bank_details'][0]['bank_name'],
  "ifsc_code": editEmployeeData['bank_details'][0]['ifsc_code'],
  "branch": editEmployeeData['bank_details'][0]['branch'],
  "acc_type": editEmployeeData['bank_details'][0]['acc_type']
}
console.log("editEmployeeData ", editEmployeeData)

//Previous Employeement info
for(var i=0; i<editEmployeeData.previous_employment.length; i++){
  console.log("nameaddr ", editEmployeeData.previous_employment[i]['name_address'], editEmployeeData.previous_employment[i]['doj'], editEmployeeData.previous_employment[i]['descig_on_join'])
  if((editEmployeeData.previous_employment[i]['name_address'] === 'null' || editEmployeeData.previous_employment[i]['name_address'] === '') && (editEmployeeData.previous_employment[i]['doj'] === 'null' || editEmployeeData.previous_employment[i]['doj'] === '') && (editEmployeeData.previous_employment[i]['descig_on_join'] === 'null' || editEmployeeData.previous_employment[i]['descig_on_join'] === '')){
    delete editEmployeeData.previous_employment[i];
  }else{
 
    if(editEmployeeData.previous_employment[i]['dor']){
      editEmployeeData.previous_employment[i]['dor'] = this.convert(editEmployeeData.previous_employment[i]['dor'])
    }else{
      editEmployeeData.previous_employment[i]['dor'] = ""
    }

    if(editEmployeeData.previous_employment[i]['doj']){
      editEmployeeData.previous_employment[i]['doj'] = this.convert(editEmployeeData.previous_employment[i]['doj'])
    }else{
      editEmployeeData.previous_employment[i]['doj'] = ""
    }

    editEmployeeData['previous_employment'][i]['reference_person_name1'] = "Prabu ",
    editEmployeeData['previous_employment'][i]['reference_person_phno1'] = "9087654321",
    editEmployeeData['previous_employment'][i]['reference_person_name2'] = "Anand",
    editEmployeeData['previous_employment'][i]['reference_person_phno2'] = "8907654321",
    editEmployeeData['previous_employment'][i]['last_working_date'] = "2020-03-13"
  }
}

    editEmployeeData.emp_id = this.creator
    editEmployeeData.created_by = this.creator
    editEmployeeData.profile_picture = "null"

  console.log("editEmployeeData ", editEmployeeData)
   
    this.userService.editEmployeeDetials(editEmployeeData).subscribe(
      res => {
        console.log("Update Employee Details Success ");
        this.addEmployeeErrMsg = "Employee Data Successfully Added"
        this.router.navigate(['employees/add-employee']);
        swal.fire({title: "Employee Updated!!!", showConfirmButton: true}).then(result => {
          if (result.value) {
          } else {
        }
        })
       },
      err => {
        console.log("Update Employee Details Failure ");
        this.addEmployeeErrMsg = "Employee Data failed to stored"
        swal.fire({title: "Employee Not Updated!!!", showConfirmButton: true}).then(result => {
          if (result.value) {
          } else {
        }
        }) 
      }
    )
  }

  convert(str) {
      var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }  

  //Pagination Steps

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
    console.log("technicalSkillsDetails event ", this.isEducationalDetails)
  }
  certificationDetails(){
    this.isCertificationDetails = !this.isCertificationDetails
    console.log("certificationDetails event ", this.isCertificationDetails)
  }
  preEmpDetails(){
    this.isPreEmpDetails = !this.isPreEmpDetails
    console.log("preEmpDetails event ", this.isPreEmpDetails)
  }
  familyDetails(){
    this.isFamilyDetails = !this.isFamilyDetails
    console.log("familyDetails event ", this.isFamilyDetails)
  }

}