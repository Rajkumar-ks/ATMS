import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2/dist/sweetalert2.js';
import { UserService } from 'src/app/service/user.service';
import {MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-profile-edit',
  templateUrl: './project-profile-edit.component.html',
  styleUrls: ['./project-profile-edit.component.css']
})

export class ProjectProfileEditComponent implements OnInit {

  parseData : any;
  projectData : any;
  startDate : any;
  endDate : any;
  res : any;
  currentMonth : any;
  currentDate : any;
  currentYear : any;
  project_id : any;
  projectname : any;
  activity_details: any = [];
  activityArr : any = [];
  effort_Arr = []
  allocatedHrs:any;
  proj_act_list_arr = [];
  proj_res_list_arr = [];
  hours: any;
  resource_details : any = [];
  resourceArr : any = [];
  projectStartDate: any;
  projectEndDate: any;

  form: FormGroup;  
  activityForm : FormGroup;
  resourceAllocateForm : FormGroup;
  documentForm : FormGroup;
  resource_unit_arr = [];
  creator : any;
  clientList : any;
  projectOwnerList : any;
  projectEmployeeList : any;
  checked = true;
  projectDetails : any;
  projectList : any;
  projectCode : any;
  projectName : any;
  proCode : any;
  proName : any;
  activityData_Arr = [];
  projectActivity_Arr = [];
  activityDetails : any;
  resourceData_Arr = []
  actId: any;
  resEmpName:any;
  resResTypeName:any;
  actIdName: any;
  resource_Arr = []
  activityId : any;
  projectsInfo : any;
  rows:any;
  effortId : any;
  projectActivityId : any;

  proj_Actv_Form: FormGroup;
  proj_Actv_From_rows: FormArray;

  addProj_Resource_Form: FormGroup;
  addProj_Resource_Form_rows: FormArray;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor( private router:Router,
              private route:ActivatedRoute,   
              private userService : UserService,
              public fb: FormBuilder,
              private _snackBar: MatSnackBar) {

                this.proj_Actv_Form = this.fb.group({
                  items: [null, Validators.required],
                  items_value: ["no", Validators.required]
                });
               this.proj_Actv_From_rows = this.fb.array([]);


               this.addProj_Resource_Form = this.fb.group({
                items: [null, Validators.required],
                items_value: ["no", Validators.required]
              });
              this.addProj_Resource_Form_rows = this.fb.array([]);

   }

  onActivityAddRow(){
    this.proj_Actv_From_rows.push(this.createdProjectActivityFormGroup())
  }
  onActivityremoveRow(rowIndex: number){
    this.proj_Actv_From_rows.removeAt(rowIndex)
  }

  onResourceAddRow(){
    this.addProj_Resource_Form_rows.push(this.createdProjectResourceFormGroup())
  }
  onResourceremoveRow(rowIndex: number){
    this.addProj_Resource_Form_rows.removeAt(rowIndex)
  }

  editActivity(){
     // Edit Activity Data List
     this.userService.editActivity(sessionStorage.getItem('projectId'), this.creator).subscribe(
      res => { 
        console.log("Edit Activity API Success", res);
        this.activity_details = res
        this.activityArr = this.activity_details
        for(var i = 0; i<this.activityArr.length; i++){
          let data = this.activityArr[i];
          this.proj_Actv_From_rows.push(this.createdAddProjectActivityFormGroup(data))
        }
      },
      err => { 
        console.log("Edit API Failure", err.message)
      }
    );
  }
  editResource(){
     //Edit Resource Data list
     this.userService.editResource(sessionStorage.getItem('projectId')).subscribe(
      res => { 
        console.log("Edit Resource API Success", res);

        this.resource_details = res
        this.resourceArr = this.resource_details
        for(var i = 0; i<this.resourceArr.length; i++){
          let data = this.resourceArr[i];
          this.addProj_Resource_Form_rows.push(this.createdAddProjectResourceFormGroup(data))
        }
      },
      err => { 
        console.log("Edit Resource API Failure", err.message)
      }
    );
  }

  projectActivityList(){
    this.userService.getProjectActivities(this.project_id).subscribe(
        res => { 
          console.log("Project Activities ", JSON.stringify(res));
          this.activityDetails = res
          console.log("Activity Details ", this.activityDetails);
          this.projectActivityId =  res.Proj_actv_Id
        },
        err => {
          console.log("Project Activities API");
        }
    )
  }
  
  createproj_Actv_FormGroup(data:any): FormGroup {
  
    return this.fb.group({
      proj_code:data.projectCode,
      proj_actv_name:data.proj_actv_name,
      proj_act_type:data.proj_act_type,
      proj_actv_start_date:data.proj_actv_start_date,
      proj_actv_end_date:data.proj_actv_end_date,
      proj_act_allocat_hrs:data.proj_act_allocat_hrs,
      proj_act_util_hrs:data.proj_act_util_hrs,
      proj_act_remaining_hrs:data.proj_act_remaining_hrs,
      proj_actv_status:data.proj_actv_status,
      created_by:data.created_by
    });
  }

  createProj_Resource_FormGroup(data:any): FormGroup {
  
    return this.fb.group({
      proj_code:data.projectCode,
      proj_res_role_type:data.proj_res_role_type,
      emp_id:data.emp_id,
      proj_act_id:data.proj_act_id,
      proj_act_name:data.proj_act_name,
      res_start_date:data.res_start_date,
      res_end_date:data.res_end_date,
      res_allocat_hrs:data.res_allocat_hrs,
      created_by:data.created_by,
      resResourceTypeName:data.resResourceTypeName,
      resEmployeeName:data.resEmployeeName
    });
  }


  ngOnInit() {

    this.creator = sessionStorage.getItem('emp_id')

    this.proj_Actv_Form.addControl('proj_Actv_From_rows', this.proj_Actv_From_rows);
    this.addProj_Resource_Form.addControl('addProj_Resource_Form_rows', this.addProj_Resource_Form_rows);

    this.route.queryParams.subscribe(params => {
      console.log("parse data", params.id)
      this.parseData = params.id;
    
      if(params.id)
      {
        this.userService.editProject(this.parseData).subscribe(
          (result) => {
            
              console.log("update project ", result)
              
              this.projectData = result;
              console.log("this.projectData['proj_name'] ", this.projectData['proj_name'], this.projectData['proj_region']);
              
              this.form.patchValue({
                region : this.projectData['proj_region'],
                client_name : this.projectData['proj_client_id'],
                project_name : this.projectData['proj_name'],

                pr_type : this.projectData['proj_type'],
                pr_start_date : this.convert(this.projectData['proj_start_date']),
                pr_efforts_cost : this.projectData['proj_po_value'],
                status : this.projectData['proj_status'],
                pr_desc : this.projectData['proj_description'],

                pr_end_date : this.convert(this.projectData['proj_planed_end_date']),
                pr_efforts : this.projectData['proj_effort'],
                totalHours : this.projectData['proj_hours'], // need to update in create project
                pr_owner : this.projectData['proj_created_by'],
                
              });

              this.project_id = this.projectData.Proj_Code
              sessionStorage.setItem('projectId', this.project_id)
              this.projectname = this.projectData.proj_name
              
              this.editActivity();
              this.projectActivityList();
              this.editResource();
          },
          err => {
            console.log("Get employee by id API error !");
          }
        )
      }
      else{
        this.router.navigate(['projects']);
      }
    });
  
    this.userService.dropDownlist().subscribe(
      res => { 
        console.log("dropdwon res ", res);
        
       let resourceUnit = res.resourcetype
       let resourceUnit_Array = resourceUnit.split(',')
       this.resource_unit_arr = [];
       for(var i = 0; i<resourceUnit_Array.length; i++){
         this.resource_unit_arr.push(resourceUnit_Array[i].split('_'));
       }

       let projectActivityUnit = res.projectactvtype
       let activityUnit_Array = projectActivityUnit.split(',')
       this.projectActivity_Arr = []
       for(var i = 0; i<activityUnit_Array.length; i++){
         this.projectActivity_Arr.push(activityUnit_Array[i].split('_'));
       }

       let resourceTypeUnit = res.resourcetype
       let resource_Array = resourceTypeUnit.split(',')
       this.resource_Arr = []
       for(var i = 0; i<resource_Array.length; i++){
         this.resource_Arr.push(resource_Array[i].split('_'));
       }

       let projectEffortTypeUnit = res.projectefforttype
       let efforts_Array = []
       efforts_Array = projectEffortTypeUnit.split(',')
       this.effort_Arr = []
       for(var i = 0; i<efforts_Array.length; i++){
         this.effort_Arr.push(efforts_Array[i].split('_'));
       }

       console.log("resource type, Project Activity ", this.resource_unit_arr, this.projectActivity_Arr);
       
      },
      err => {
        console.log("API Error");
      }
    );

    this.userService.clientList().subscribe(
      res => { 
        console.log("Client List res ", res);
        this.clientList = res
      },
      err => {
        console.log("Client List Failure");
      }
    )

    this.userService.getProjectOwner().subscribe(
      res => { 
        console.log("Project Owner List res ", res);
        this.projectOwnerList = res
      },
      err => {
        console.log("Project Owner List Failure");
      }
    )

    this.userService.getProjectEmp().subscribe(
      res => { 
        this.projectEmployeeList = res;  
        console.log("Project Employee List res", this.projectEmployeeList);
      },
      err => {
        console.log("API Failure for Project Employee");
      }
    );

   this.form = this.fb.group({
     'client_name' : new FormControl( ''),
     'project_name' : new FormControl(''),
     'region' : new FormControl(''),
     'pr_type' : new FormControl(''),
     'pr_start_date' : new FormControl(''),
     'pr_end_date' : new FormControl(''),
     'pr_efforts' : new FormControl(''),
     'pr_hours' : new FormControl(''),
     'pr_efforts_cost' : new FormControl(''),
     'pr_desc' : new FormControl('',),
     'status' : new FormControl('',),
     'pr_owner' : new FormControl(''),
    'totalHours': new FormControl(''),
   });

   this.activityForm = this.fb.group({
    'proj_actv_status' : new FormControl(true, [
      Validators.required,
    ]),
    'activity_name' : new FormControl( '', [
      Validators.required,
    ]),
    'activity_type' : new FormControl( '', [
      Validators.required,
    ]),
    'ac_start_date' : new FormControl( '', [
      Validators.required,
    ]),
    'ac_end_date' : new FormControl( '', [
      Validators.required,
    ]),
    'ac_allocated_hrs' : new FormControl( '', [
      Validators.required,
    ]),
    'ac_utilized_hrs' : new FormControl( '', [
      Validators.required,
    ]),
    'ac_remaining_hrs' : new FormControl('', [
      Validators.required,
    ]),
   
    
   });
   this.resourceAllocateForm = this.fb.group({
    'resourceType' : new FormControl('', [
      Validators.required,
    ]),
    'employeeName' : new FormControl('', [
      Validators.required,
    ]),
    're_start_date' : new FormControl('', [
      Validators.required,
    ]),
    're_end_date' : new FormControl('', [
      Validators.required,
    ]),
    'allottedHours' : new FormControl('', [
      Validators.required,
    ]),
    'activityAct' : new FormControl('', [
      Validators.required,
    ]),
    'resActvityName': new FormControl('', [
      Validators.required,
    ]),
    'resResourceTypeName': new FormControl('', [
      Validators.required,
    ]),
    'resEmployeeName': new FormControl('', [
      Validators.required,
    ])
    
   });
   this.documentForm = this.fb.group({
     'documentAccessStatus' : new FormControl(true, [
      Validators.required,
    ]), 
     'document' : new FormControl('', [
       Validators.required,
     ]), 
     'documentFile' : new FormControl('', [
       Validators.required,
     ])
   })
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
    this.startDate = { date: { year: this.currentYear, month: this.currentMonth, day: this.currentDate }};
    return this.startDate;
    }
  }
  //Create Project
  get client_name(){
    return this.form.get('client_name')
  }
  get project_name(){
    return this.form.get('project_name')
  }
  get region(){
    return this.form.get('region')
  }
  get pr_type(){
    return this.form.get('pr_type')
  }
  get pr_start_date(){
    return this.form.get('pr_start_date')
  }
  get pr_end_date(){
    return this.form.get('pr_end_date')
  }
  get pr_efforts(){
    return this.form.get('pr_efforts')
  }
  get pr_hours(){
    return this.form.get('pr_hours')
  }
  get pr_efforts_cost(){
    return this.form.get('pr_efforts_cost')
  }
  get pr_desc(){
    return this.form.get('pr_desc')
  }
  get pr_owner(){
    return this.form.get('pr_owner')
  }
  get status(){
    return this.form.get('status')
  }
  get totalHours(){
    return this.form.get('totalHours')
  }

  //Resouce Allocation
  get proj_actv_status(){
    return this.resourceAllocateForm.get('proj_actv_status')
  }
  get resourceType(){
    return this.resourceAllocateForm.get('resourceType')
  }
  get employeeName(){
    return this.resourceAllocateForm.get('employeeName')
  }
  get re_start_date(){
    return this.resourceAllocateForm.get('re_start_date')
  }
  get re_end_date(){
    return this.resourceAllocateForm.get('re_end_date')
  }
  get allottedHours(){
    return this.resourceAllocateForm.get('allottedHours')
  }
  get activityAct(){
    return this.resourceAllocateForm.get('activityAct')
  }
  get resActvityName() {
    return this.resourceAllocateForm.get('resActvityName')
  }
  get resResourceTypeName() {
    return this.resourceAllocateForm.get('resResourceTypeName')
  }
  get resEmployeeName() {
    return this.resourceAllocateForm.get('resEmployeeName')
  }

  //Create Activity
  get activity_name(){
    return this.activityForm.get('activity_name')
  }
  get activity_type(){
    return this.activityForm.get('activity_type')
  }
  get ac_start_date(){
    return this.activityForm.get('ac_start_date')
  }
  get ac_end_date(){
    return this.activityForm.get('ac_end_date')
  }
  get ac_allocated_hrs(){
    return this.activityForm.get('ac_allocated_hrs')
  }
  get ac_utilized_hrs(){
    return this.activityForm.get('ac_utilized_hrs')
  }
  get ac_remaining_hrs(){
    return this.activityForm.get('ac_remaining_hrs')
  }
  

  //document file
  get documentAccessStatus(){
    return this.documentForm.get('documentAccessStatus')
  }
  get document(){
    return this.documentForm.get('document')
  }
  get documentFile(){
    return this.documentForm.get('documentFile')
  }

  updateProject(){
    let projectData = this.form.value;
    let project_Details = {
      "proj_region":projectData.region, 
      "proj_client_id":projectData.client_name, 
      "proj_name":projectData.project_name, 
      "proj_type":projectData.pr_type, 
      "proj_owner":projectData.pr_owner, 
      "proj_start_date":projectData.pr_start_date,    
      "proj_end_date":projectData.pr_end_date,
      "proj_effort" : projectData.pr_efforts,
      "proj_hours":projectData.pr_hours, 
      "proj_po_value":projectData.pr_efforts_cost, 
      "proj_description":projectData.pr_desc, 
      "proj_status":projectData.status, 
      "created_by":this.creator,
      "proj_code" : this.parseData 
      }

     console.log("update data ", JSON.stringify(project_Details));

      this.userService.updateProject(project_Details).subscribe(
        res => { 
          
          console.log("Add Project API ", res.Proj_Code, res.Proj_Name);
          sessionStorage.setItem("projectCode", res.Proj_Code)
          sessionStorage.setItem("projectName", res.Proj_Name)
          this.projectName = sessionStorage.getItem('projectName')
          this.projectCode = sessionStorage.getItem('projectCode')
       
          swal.fire({title: "Project Updated!!!", showConfirmButton: true}).then(result => {
            if (result.value) {
              
            } else {
            
            }
          })
        },
        err => {
          console.log("API Error", err);
          swal.fire({title: "Project Not Updated!!!", showConfirmButton: true}).then(result => {
            if (result.value) {
            
            } else {
            
            }
          })
        }
      );
  }
  updateActivites(proCode, proName){
   
    let proj_actv_data=this.proj_Actv_Form.getRawValue();

    let updateActivityData = proj_actv_data.proj_Actv_From_rows

    this.userService.updateActivity(proj_actv_data.proj_Actv_From_rows).subscribe(
      res => { 
       console.log("Update Activity API Success ")
       this.userService.getProjectActivities(this.project_id).subscribe(
        res => { 
          console.log("Project Activities ", JSON.stringify(res));
          this.activityDetails = res
          console.log("Activity Details ", this.activityDetails);
          this.projectActivityId =  res.Proj_actv_Id
       
          swal.fire({title: "Activity Updated!!!", showConfirmButton: true}).then(result => {
            if (result.value) {
            
            } else {
            
            }
          })
        },
        err => {
          console.log("Project Activities API");
          swal.fire({title: "Activity Not Updated!!!", showConfirmButton: true}).then(result => {
            if (result.value) {
           
            } else {
           
            }
          })
        }
      )
      },
      err => {
       
      }
    );
  }
  resourceAllocation(proCode, proName){
    let resData = this.resourceAllocateForm.value
    console.log("Resource Allocation ", this.projectCode, this.activityId  )

    let proj_res_data=this.addProj_Resource_Form.getRawValue();

    console.log("Resource Form Data ",  proj_res_data.addProj_Resource_Form_rows)

    this.userService.addResource(proj_res_data.addProj_Resource_Form_rows).subscribe(
      res => { 
        console.log("Update Resource API ");
        this.userService.updateResource(proj_res_data.addProj_Resource_Form_rows).subscribe(
          res => {
            console.log("Update Resource allocation API Success")
          },
          err =>{
            console.log("Update Resource allocation API Failure")
            swal.fire({title: "Resource Allocation Updated!!!", showConfirmButton: true}).then(result => {
              if (result.value) {
                
              } else {
                
              }
            })
          }
        )
        swal.fire({title: "Resource Updated!!!", showConfirmButton: true}).then(result => {
          if (result.value) {
            
          } else {
            
          }
        })
      },
      err => {
        console.log("Update Resource API Error");
        swal.fire({title: "Resource Not Updated!!!", showConfirmButton: true}).then(result => {
          if (result.value) {
            
          } else {
            
          }
        })
      }
    );
  }
  moveToSelectedTab(tabName: string, type,  projectCode , projectName) {
    
    if(type === 'create'){
      this.updateProject();
    }else if(type === 'activity'){
      this.updateActivites(projectCode, projectName);
    }else if(type === 'resource allocation'){
      this.resourceAllocation(projectCode, projectName);
    }
    
    for (let i =0; i< document.querySelectorAll('.mat-tab-label-content').length; i++) {
      if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) 
        {
            (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
        }
      }
    }

    searchEfforts(efforts) {
      this.effortId = efforts
    }

 selectedActivity(projectCode){
   
  console.log("this.activityForm.value.ac_utilized_hrs ", this.activityForm.value.ac_utilized_hrs);
  
   if(this.activityForm.value.proj_actv_status == true){
    this.activityForm.value.proj_actv_status = '1'
   }else{
    this.activityForm.value.proj_actv_status = '0'
   }

   let proj_act_list= {
    proj_code:sessionStorage.getItem('projectId'),
    proj_actv_name:this.activityForm.value.activity_name,
    proj_act_type:this.activityForm.value.activity_type[0],
    proj_act_type_name:this.activityForm.value.activity_type[1],
    proj_actv_start_date:this.convert(this.activityForm.value.ac_start_date),
    proj_actv_end_date:this.convert(this.activityForm.value.ac_end_date),
    proj_act_allocat_hrs:this.activityForm.value.ac_allocated_hrs,
    proj_act_util_hrs:this.activityForm.value.ac_utilized_hrs,
    proj_act_remaining_hrs:this.activityForm.value.ac_remaining_hrs,
    proj_actv_status:this.activityForm.value.proj_actv_status,
    created_by:sessionStorage.getItem("emp_id"),
  }
  console.log("selected Activities ", proj_act_list);

  this.proj_act_list_arr.push(proj_act_list)
   this.userService.addActivity(this.proj_act_list_arr).subscribe(
    res => { 
     this.proj_Actv_Form.addControl('proj_Actv_From_rows', this.proj_Actv_From_rows);
     this.proj_Actv_From_rows.push(this.createproj_Actv_FormGroup(proj_act_list));
  
     this.activityForm.reset();
    },
    err =>{
      console.log("Add project form edit project component API Error")
    }
   )
 }

 selectedResourceAllocation(projectCode){

  console.log("selected Resource ", this.resourceAllocateForm.value);

  let proj_res_list={
    proj_code:sessionStorage.getItem('projectId'),
    proj_res_role_type:this.resourceAllocateForm.value.resourceType,
    emp_id:this.resourceAllocateForm.value.employeeName,
    proj_act_id:this.resourceAllocateForm.value.activityAct,
    proj_act_name: this.resourceAllocateForm.value.resActvityName,
    res_start_date:this.convert(this.resourceAllocateForm.value.re_start_date),
    res_end_date:this.convert(this.resourceAllocateForm.value.re_end_date),
    res_allocat_hrs:this.resourceAllocateForm.value.allottedHours,
    created_by:sessionStorage.getItem('emp_id'),
    resResourceTypeName:this.resourceAllocateForm.value.resResourceTypeName,
    resEmployeeName:this.resourceAllocateForm.value.resEmployeeName
  }

  this.proj_res_list_arr.push(proj_res_list);

  this.userService.addResource(this.proj_res_list_arr).subscribe(
    res => { 
      console.log("Add Resource form edit project component API called", JSON.stringify(res));
  
     this.proj_Actv_Form.addControl('proj_Actv_From_rows', this.proj_Actv_From_rows);
     this.proj_Actv_From_rows.push(this.createproj_Actv_FormGroup(proj_res_list));
  
     this.activityForm.reset();
    },
    err =>{
      console.log("Add Resource form edit project component API Error")
    }
   )
  this.addProj_Resource_Form.addControl('addProj_Resource_Form_rows', this.addProj_Resource_Form_rows);
  this.addProj_Resource_Form_rows.push(this.createProj_Resource_FormGroup(proj_res_list));
  this.resourceAllocateForm.reset();
 }

 createdProjectActivityFormGroup(): FormGroup{
  return this.fb.group({
    actv_pr_id: null,
    created_by: null,
    created_date: null,
    proj_act_allocat_hrs: null,
    proj_act_remaining_hrs: null,
    proj_act_type: null,
    proj_act_util_hrs: null,
    proj_actv_end_date: null,
    proj_actv_id: null,
    proj_actv_name: null,
    proj_actv_start_date: null,
    proj_actv_status: null,
    proj_code: null,
    updt_by: null,
    updt_date: null
  })
}
createdAddProjectActivityFormGroup(data : any): FormGroup{
   return this.fb.group({
    actv_pr_id: data.actv_pr_id,
    created_by: data.created_by,
    created_date: data.created_date,
    proj_act_allocat_hrs: data.proj_act_allocat_hrs,
    proj_act_remaining_hrs: data.proj_act_remaining_hrs,
    proj_act_type: data.proj_act_type,
    proj_act_type_name: data.proj_act_type_name,
    proj_act_util_hrs: data.proj_act_util_hrs,
    proj_actv_end_date: data.proj_actv_end_date,
    proj_actv_id: data.proj_actv_id,
    proj_actv_name: data.proj_actv_name,
    proj_actv_start_date: data.proj_actv_start_date,
    proj_actv_status: data.proj_actv_status,
    proj_code: data.proj_code,
    updt_by: data.updt_by,
    updt_date: data.updt_date
   })
 }
 createdAddProjectResourceFormGroup(data : any): FormGroup{
   return this.fb.group({
        created_by: data.created_by,
        created_date: data.created_date,
        emp_id: data.emp_id,
        emp_name: data.emp_name,
        proj_actv_id: data.proj_actv_id, 
        proj_act_name:data.proj_act_name,
        proj_code: data.proj_code, 
        proj_res_allocat_id: data.proj_res_allocat_id,
        proj_res_role_type: data.proj_res_role_type, 
        res_allocat_hrs: data.res_allocat_hrs,
        res_end_date: data.res_end_date,
        res_start_date: data.res_start_date,
        updt_by: data.updt_by,
        updt_date: data.updt_date,
        resResourceTypeName:data.resResourceTypeName,
        resEmployeeName:data.resEmployeeName
  })
  }

  createdProjectResourceFormGroup(): FormGroup{
    return this.fb.group({
         created_by: null,
         created_date: null,
         emp_id: null,
         emp_name: null,
         proj_actv_id: null, 
         proj_act_name:null,
         proj_code: null, 
         proj_res_allocat_id: null,
         proj_res_role_type: null, 
         res_allocat_hrs: null,
         res_end_date: null,
         res_start_date: null,
         updt_by: null,
         updt_date: null,
         resResourceTypeName:null,
         resEmployeeName:null
   })
   }

   checkProjectStartDate(date) {
    console.log("Start Date ", this.convert(date.value));
    // this.projectStartDate = date.formatted;
    this.projectStartDate = this.convert(date.value);
    this.getProjectAllocatedHrs();
  }


  checkProjectEndDate(date) {
    console.log("End Date ", this.convert(date.value));
    // this.projectEndDate = date.formatted
    this.projectEndDate = this.convert(date.value)
    this.getProjectAllocatedHrs();
  }


   checkStartDate(date){
    console.log("checkStartDateEndDate ", date.formatted," project_id "+this.project_id)
    let inputObj={
      "date":this.convert(date.value),
      "proj_code":this.project_id
    };
   this.userService.checkDate(inputObj).subscribe(
     res => {
       if(res.message === "false"){
       
        this.activityForm.get('ac_start_date').reset();
        this.delay(300);
        this.openSnackBar("Please enter the valid date based on project start and end date","End");
         
       }else{
         this.getAllocatedHrs()
       }
      
     }, 
     err => {
       console.log("Check Start Date & End Date API Error", err)
     }
   )
  }


  checkEndDate(date){
    let inputObj={
      "date":this.convert(date.value),
      "proj_code":this.project_id
    };
   this.userService.checkDate(inputObj).subscribe(
     res => {
       console.log("Check Start Date & End Date ", res)
       console.log(res.message)
       if(res.message === "false"){

        this.activityForm.get('ac_end_date').reset();
        this.delay(300);
         
          this.openSnackBar("Please enter the valid date based on project start and end date","End");
        
          
       }else{
        this.getAllocatedHrs()
      }
      
     }, 
     err => {
       console.log("Check Start Date & End Date API Error", err)
     }
   )
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  openSnackBar(message1,message2) {
    
    this._snackBar.open(message1, message2, {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  getAllocatedHrs(){
    var startdate=this.convert(this.activityForm.get('ac_start_date').value)
    var enddate=this.convert(this.activityForm.get('ac_end_date').value)

    if(startdate !=null && enddate !=null){
      let inputObj={
        "startDate":startdate,
        "endDate":enddate
      };
     this.userService.getAllocatedHours(inputObj).subscribe(
      res => {
        console.log("Check Start Date & End Date ", res)
        console.log(res.message)
        if(res.message != "null"){
          this.allocatedHrs=res.message;
        }else{
          swal.fire({title: "Something went wrong!", showConfirmButton: true}).then(result => {
           // this.activityForm.get('ac_end_date').reset()
          })
       }
       
      }, 
      err => {
        console.log("Check Start Date & End Date API Error", err)
      }
    )
    }    
  }

  getProjectAllocatedHrs() {
    var startdate = this.projectStartDate
    var enddate = this.projectEndDate
    console.log("startdate=" + startdate)
    console.log("enddate=" + enddate)

    if (startdate != null && enddate != null) {
      let inputObj = {
        "startDate": startdate,
        "endDate": enddate
      };
      this.userService.getProjectAllocatedHours(inputObj).subscribe(
        res => {
          console.log("Check Start Date & End Date ", res)
          console.log(res.message)
          if (res.message != "null") {
            this.hours = res.message;
          } else {
            swal.fire({ title: "Something went wrong!", showConfirmButton: true }).then(result => {
              // this.activityForm.get('ac_end_date').reset()
            })
          }

        },
        err => {
          console.log("Check Start Date & End Date API Error", err)
        }
      )
    }
  }

  getallocatedHrstoResource() {

    console.log("res rows", this.addProj_Resource_Form_rows.value);
    console.log("res rows value", this.addProj_Resource_Form_rows.value);
    let resAllcatFormList : any = [];
    resAllcatFormList = this.addProj_Resource_Form_rows.value;
    console.log("resAllcatFormList===> ", resAllcatFormList)
    var resAllccatedHrs = "";
    for (var i = 0; i < resAllcatFormList.length; i++) {
      let resValues:any;
      resValues = resAllcatFormList[i];
      console.log("resValues===> ", resValues);
      if (resValues.proj_act_id == this.actId) {
        if (resAllccatedHrs.length == 0) {
          resAllccatedHrs = resValues.res_allocat_hrs;
        } else {
          resAllccatedHrs = resAllccatedHrs + "," + resValues.res_allocat_hrs;
        }
      }
    }


    console.log("resAllccatedHrs===> " + resAllccatedHrs);
    return resAllccatedHrs;
  }


  validateResourceAllocatedHrs(hrs) {
    var resAllccatedHrs = this.getallocatedHrstoResource();
    
    if (hrs != null || hrs.length != 0) {
      let inputObj = {
        "projectCode": sessionStorage.getItem('projectCode'),
        "actvId": this.resourceAllocateForm.value.activityAct,
        "hours": hrs
      };

      this.userService.validateResourceAllocatedHrs(inputObj).subscribe(
        res => {
          console.log("Check Start Date & End Date ", res)
          console.log(res)
          if (res.message === "false") {
            this.resourceAllocateForm.get('allottedHours').reset();
            this.delay(300);
            this.openSnackBar("Entered Resource Allocation hours is greater then selected Activity allocated Hour", "End");
          }
        },
        err => {
          console.log("Check Start Date & End Date API Error", err)
        }
      )
    }
  }


  getActivtyId(event) {
    this.actId = event
    for(var i=0;i<this.activityDetails.length;i++){
      let obj=this.activityDetails[i];
      if(obj.Proj_actv_Id == this.actId){
        this.actIdName=obj.Proj_actv_Name
      }
    }
  }


  getEmployeeName(event){
    console.log("getEmployeeName ", event);
    let empId = event;
    for(var i=0;i<this.projectEmployeeList.length;i++){
      let projectEmployeeobj=this.projectEmployeeList[i];
      if(empId == projectEmployeeobj.empid){
        this.resEmpName=projectEmployeeobj.empname;
        console.log("this.resEmpName ", this.resEmpName)
      }
    }
  }

  getResourceTypeName(event){
    console.log("getResourceTypeName ", event)
    let restypeid = event;
    for(var i=0;i<this.resource_Arr.length;i++){
      let resource_Arrobj=this.resource_Arr[i];
      if(restypeid==resource_Arrobj[0]){
        this.resResTypeName=resource_Arrobj[1]
        console.log("this.resResTypeName ", this.resResTypeName)
      }
    }
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }


}