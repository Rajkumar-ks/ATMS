import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
// import { Session } from 'inspector';
import { IMyDpOptions } from 'mydatepicker';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-project-profile-details',
  templateUrl: './project-profile-details.component.html',
  styleUrls: ['./project-profile-details.component.css']
})
export class ProjectProfileDetailsComponent implements OnInit {

  form: FormGroup;
  activityForm: FormGroup;
  allocatedHrs: any;
  resourceAllocateForm: FormGroup;
  documentForm: FormGroup;
  resource_unit_arr = [];
  creator: any;
  clientList: any;
  projectOwnerList: any;
  projectEmployeeList: any;
  checked = true;
  projectDetails: any;
  projectList: any;
  projectCode: any;
  actId: any;
  resEmpName:any;
  resResTypeName:any;
  actIdName: any;
  projectStartDate: any;
  projectEndDate: any;

  projectName: any;
  proCode: any;
  proName: any;
  activityData_Arr = [];
  projectActivity_Arr = [];
  activityDetails: any;
  resourceData_Arr = []
  resource_Arr = []
  effort_Arr = []
  activityId: any;
  projectsInfo: any;
  rows: any;
  projectActivityId: any;
  efforts: any;
  effortType: any;
  hours: any;
  effortId: any;
  errorMessage: any;

  manDayManMonth: any;

  proj_Actv_Form: FormGroup;
  proj_Actv_From_rows: FormArray;

  addProj_Resource_Form: FormGroup;
  addProj_Resource_Form_rows: FormArray;
  
  addProj_Document_Form: FormGroup;
  addProj_Document_Form_rows: FormArray;

  public myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '38px'
  };

  selectEnableStatus = true;

  createproj_Actv_FormGroup(data: any): FormGroup {

    return this.fb.group({
      proj_code: data.projectCode,
      proj_actv_name: data.proj_actv_name,
      proj_act_type: data.proj_act_type,
      proj_act_type_name: data.proj_act_type_name,
      proj_actv_start_date: data.proj_actv_start_date,
      proj_actv_end_date: data.proj_actv_end_date,
      proj_act_allocat_hrs: data.proj_act_allocat_hrs,
      proj_act_util_hrs: data.proj_act_util_hrs,
      proj_act_remaining_hrs: data.proj_act_remaining_hrs,
      proj_actv_status: data.proj_actv_status,
      created_by: data.created_by
    });
  }

  createProj_Resource_FormGroup(data: any): FormGroup {
    console.log("createProj_Resource_FormGroup ", data);
    
    return this.fb.group({
      proj_code: data.projectCode,
      proj_res_role_type: data.proj_res_role_type,
      emp_id: data.emp_id,
      proj_act_name:data.proj_act_name,
      proj_act_id: data.proj_act_id,
      res_start_date: data.res_start_date,
      res_end_date: data.res_end_date,
      res_allocat_hrs: data.res_allocat_hrs,
      created_by: data.created_by,
      resResourceTypeName:data.resResourceTypeName,
      resEmployeeName:data.resEmployeeName
    });
  }

  //document API
  createProj_Document_FormGroup(data : any): FormGroup{
    return this.fb.group({
      projectCode: data.projectCode,
      document:data.document,
      documentFile:data.documentFile,
      documentFileBaseStr:data.documentFileBaseStr,
      documentAccessStatus:data.documentAccessStatus,
      created_by: data.created_by
    });
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private router: Router,
    private userService: UserService,
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

    this.addProj_Document_Form = this.fb.group({
      items: [null, Validators.required],
      items_value: ["no", Validators.required]
    });
    this.addProj_Document_Form_rows = this.fb.array([]);

  }

  ngOnInit() {

    this.creator = sessionStorage.getItem('emp_id')

    this.userService.dropDownlist().subscribe(
      res => {
        console.log("dropdwon res ", res);

        let resourceUnit = res.resourcetype
        let resourceUnit_Array = []
        resourceUnit_Array = resourceUnit.split(',')
        this.resource_unit_arr = [];
        for (var i = 0; i < resourceUnit_Array.length; i++) {
          this.resource_unit_arr.push(resourceUnit_Array[i].split('_'));
        }

        let projectActivityUnit = res.projectactvtype
        let activityUnit_Array = []
        activityUnit_Array = projectActivityUnit.split(',')
        this.projectActivity_Arr = []
        for (var i = 0; i < activityUnit_Array.length; i++) {
          this.projectActivity_Arr.push(activityUnit_Array[i].split('_'));
        }

        let resourceTypeUnit = res.resourcetype
        let resource_Array = []
        resource_Array = resourceTypeUnit.split(',')
        this.resource_Arr = []
        for (var i = 0; i < resource_Array.length; i++) {
          this.resource_Arr.push(resource_Array[i].split('_'));
        }

        let projectEffortTypeUnit = res.projectefforttype
        let efforts_Array = []
        efforts_Array = projectEffortTypeUnit.split(',')
        this.effort_Arr = []
        for (var i = 0; i < efforts_Array.length; i++) {
          this.effort_Arr.push(efforts_Array[i].split('_'));
        }

        console.log("Project efforts ", this.effort_Arr);

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

    // this.userService.getProjectList(this.creator).subscribe(
    //   res => { 
    //     console.log("Project Owners List res", res);
    //     this.projectsInfo = res
    //   },
    //   err => {
    //     console.log("API Failure for Project Owners List");
    //   }
    // );

    this.form = this.fb.group({
      'client_name': new FormControl('', [
        Validators.required,
      ]),
      'project_name': new FormControl('', [
        Validators.required,
      ]),
      'region': new FormControl('', [
        Validators.required,
      ]),
      'pr_type': new FormControl('', [
        Validators.required,
      ]),
      'pr_start_date': new FormControl(''),
      'pr_end_date': new FormControl(''),
      'proj_effort': new FormControl('', [
        Validators.required,
      ]),
      'pr_hours': new FormControl(''),
      'pr_efforts_cost': new FormControl('', [
        Validators.required,
      ]),
      'pr_desc': new FormControl('', [
        Validators.required,
      ]),
      'status': new FormControl('', [
        Validators.required,
      ]),
      'pr_owner': new FormControl('', [
        Validators.required,
      ]),
      'totalHours': new FormControl('')
    });

    this.activityForm = this.fb.group({
      'proj_actv_status' : new FormControl(true, [
        Validators.required,
      ]),
      'activity_name': new FormControl('', [
        Validators.required,
      ]),
      'activity_type': new FormControl('', [
        Validators.required,
      ]),
      'ac_start_date': new FormControl('', [
        Validators.required,
      ]),
      'ac_end_date': new FormControl('', [
        Validators.required,
      ]),
      'ac_allocated_hrs': new FormControl('', [
        Validators.required,
      ]),
      'ac_utilized_hrs': new FormControl(''),
      'ac_remaining_hrs': new FormControl(''),

    });
    this.resourceAllocateForm = this.fb.group({
      'resourceType': new FormControl('', [
        Validators.required,
      ]),
      'employeeName': new FormControl('', [
        Validators.required,
      ]),
      're_start_date': new FormControl('', [
        Validators.required,
      ]),
      're_end_date': new FormControl('', [
        Validators.required,
      ]),
      'allottedHours': new FormControl('', [
        Validators.required,
      ]),
      'activityAct': new FormControl('', [
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
      'document': new FormControl('', [
        Validators.required,
      ]),
      'documentFile': new FormControl('', [
        Validators.required,
      ]),
      'documentAccessStatus': new FormControl('', [
        Validators.required,
      ])
    })
  }

  //Create Project   
  get client_name() {
    return this.form.get('client_name')
  }
  get project_name() {
    return this.form.get('project_name')
  }
  get region() {
    return this.form.get('region')
  }
  get pr_type() {
    return this.form.get('pr_type')
  }
  get pr_start_date() {
    return this.form.get('pr_start_date')
  }
  get pr_end_date() {
    return this.form.get('pr_end_date')
  }
  get proj_effort() {
    return this.form.get('proj_effort')
  }
  get pr_hours() {
    return this.form.get('pr_hours')
  }
  get pr_efforts_cost() {
    return this.form.get('pr_efforts_cost')
  }
  get pr_desc() {
    return this.form.get('pr_desc')
  }
  get pr_owner() {
    return this.form.get('pr_owner')
  }
  get status() {
    return this.form.get('status')
  }
  get totalHours() {
    return this.form.get('totalHours')
  }

  //Resouce Allocation
  get resourceType() {
    return this.resourceAllocateForm.get('resourceType')
  }
  get employeeName() {
    return this.resourceAllocateForm.get('employeeName')
  }
  get re_start_date() {
    return this.resourceAllocateForm.get('re_start_date')
  }
  get re_end_date() {
    return this.resourceAllocateForm.get('re_end_date')
  }
  get allottedHours() {
    return this.resourceAllocateForm.get('allottedHours')
  }
  get activityAct() {
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
  get activity_name() {
    return this.activityForm.get('activity_name')
  }
  get activity_type() {
    return this.activityForm.get('activity_type')
  }
  get ac_start_date() {
    return this.activityForm.get('ac_start_date')
  }
  get ac_end_date() {
    return this.activityForm.get('ac_end_date')
  }
  get ac_allocated_hrs() {
    return this.activityForm.get('ac_allocated_hrs')
  }
  get ac_utilized_hrs() {
    return this.activityForm.get('ac_utilized_hrs')
  }
  get ac_remaining_hrs() {
    return this.activityForm.get('ac_remaining_hrs')
  }

  //document file
  get document() {
    return this.documentForm.get('document')
  }
  get documentFile() {
    return this.documentForm.get('documentFile')
  }
  get documentAccessStatus() {
    return this.documentForm.get('documentAccessStatus')
  }
  
  addProject() {
    let Data = this.form.value;
    console.log("add project ", Data);
    

    let project_Details = {
      "proj_region": Data.region,
      "proj_client_id": Data.client_name,
      "proj_name": Data.project_name,
      "proj_type": Data.pr_type,
      "proj_owner": Data.pr_owner,
      "proj_start_date": this.convert(Data.pr_start_date),
      "proj_end_date": this.convert(Data.pr_end_date),
      "proj_effort": this.effortId,
      "proj_hours": Data.totalHours,
      "proj_po_value": Data.pr_efforts_cost,
      "proj_description": Data.pr_desc,
      "proj_status": Data.status,
      "created_by": this.creator
    }

    console.log("Project Details ", project_Details);
    
    this.userService.addProject(project_Details).subscribe(
      res => {
        sessionStorage.setItem("projectCode", res.Proj_Code)
        sessionStorage.setItem("projectName", res.Proj_Name)
        this.projectName = sessionStorage.getItem('projectName')
        this.projectCode = sessionStorage.getItem('projectCode')
        this.errorMessage = "Project Succesfully Stored"

        swal.fire({ title: "Project Data saved!!!", showConfirmButton: true }).then(result => {
          if (result.value) {
            // handle Confirm button click
            // result.value will contain `true` or the input value
          } else {
            // handle dismissals
            // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
          }
        })
      },
      err => {
        this.errorMessage = "Project Failed to store"
        console.log("API Error", err, err.status);
        // this.router.navigate(['projects']);
      }
    );
  }
  addActivites(proCode, proName) {

    let proj_actv_data = this.proj_Actv_Form.getRawValue();

    this.userService.addActivity(proj_actv_data.proj_Actv_From_rows).subscribe(
      res => {
        console.log("addActivity API Called", proCode)
        this.userService.getProjectActivities(proCode).subscribe(
          res => {
            console.log("Get Project Activities API called", JSON.stringify(res));
            this.activityDetails = res
            console.log("Activity Details ", this.activityDetails);
            this.projectActivityId = res.Proj_actv_Id
          },
          err => {
            console.log("Project Activities API");
          }
        )
        swal.fire({ title: "Activity saved!!!", showConfirmButton: true }).then(result => {
          if (result.value) {
            // handle Confirm button click
            // result.value will contain `true` or the input value
          } else {
            // handle dismissals
            // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
          }
        })
        // this.router.navigate(['projects']);
      },
      err => {
        console.log("Activity API Error");
        swal.fire({ title: "Activity saved!!!", showConfirmButton: true }).then(result => {
          if (result.value) {
            // handle Confirm button click
            // result.value will contain `true` or the input value
          } else {
            // handle dismissals
            // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
          }
        })
        //this.router.navigate(['projects']);
      }
    );
  }
  resourceAllocation(proCode, proName) {
    let resData = this.resourceAllocateForm.value
    console.log("Resource Allocation ", this.projectCode, this.activityId)

    let proj_res_data = this.addProj_Resource_Form.getRawValue();

    console.log("Resource Form Data ", proj_res_data.addProj_Resource_Form_rows)

    this.userService.addResource(proj_res_data.addProj_Resource_Form_rows).subscribe(
      res => {
        console.log("Add Resource API ");
        swal.fire({ title: "Resource Allocation saved!!!", showConfirmButton: true }).then(result => {
          if (result.value) {
            // handle Confirm button click
            // result.value will contain `true` or the input value
          } else {
            // handle dismissals
            // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
          }
        })
        // this.router.navigate(['projects']);
      },
      err => {
        console.log("Resource API Error");
        swal.fire({ title: "Resource Allocation Not saved!!!", showConfirmButton: true }).then(result => {
          if (result.value) {
            // handle Confirm button click
            // result.value will contain `true` or the input value
          } else {
            // handle dismissals
            // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
          }
        })
        //this.router.navigate(['projects']);
      }
    );
  }
  moveToSelectedTab(tabName: string, type, projectCode, projectName) {
    if (type === 'create') {
      console.log("create");
      this.addProject();
    } else if (type === 'activity') {
      console.log("activity");
      this.addActivites(projectCode, projectName);
    } else if (type === 'resource allocation') {
      this.resourceAllocation(projectCode, projectName);
      console.log("Resource Allocation");
    }
    for (let i = 0; i < document.querySelectorAll('.mat-tab-label-content').length; i++) {
      if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
        (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
      }
    }
  }
  selectedActivity(projectCode) {

    console.log("selected Activity ", this.activityForm.value);
    
    if(this.activityForm.value.proj_actv_status == true){
      this.activityForm.value.proj_actv_status = "1"
    }else{
      this.activityForm.value.proj_actv_status = "0"
    }

    let proj_act_list = {
      projectCode: projectCode,
      proj_actv_name: this.activityForm.value.activity_name,
      proj_act_type: this.activityForm.value.activity_type[0],
      proj_act_type_name: this.activityForm.value.activity_type[1],
      proj_actv_start_date: this.convert(this.activityForm.value.ac_start_date),
      proj_actv_end_date: this.convert(this.activityForm.value.ac_end_date),
      proj_act_allocat_hrs: this.activityForm.value.ac_allocated_hrs,
      proj_act_util_hrs: this.activityForm.value.ac_utilized_hrs,
      proj_act_remaining_hrs: this.activityForm.value.ac_remaining_hrs,
      proj_actv_status: this.activityForm.value.proj_actv_status,
      created_by: sessionStorage.getItem("emp_id")
    }
    console.log("proj_act_list ", proj_act_list);
    this.proj_Actv_Form.addControl('proj_Actv_From_rows', this.proj_Actv_From_rows);
    this.proj_Actv_From_rows.push(this.createproj_Actv_FormGroup(proj_act_list));
    this.activityForm.reset();
  }
  selectedResourceAllocation(projectCode) {

    let proj_res_list = {
      projectCode: projectCode,
      proj_res_role_type: this.resourceAllocateForm.value.resourceType,
      emp_id: this.resourceAllocateForm.value.employeeName,
      proj_act_id: this.resourceAllocateForm.value.activityAct,
      proj_act_name: this.resourceAllocateForm.value.resActvityName,
      res_start_date: this.convert(this.resourceAllocateForm.value.re_start_date),
      res_end_date: this.convert(this.resourceAllocateForm.value.re_end_date),
      res_allocat_hrs: this.resourceAllocateForm.value.allottedHours,
      created_by: sessionStorage.getItem('emp_id'),
      resResourceTypeName:this.resourceAllocateForm.value.resResourceTypeName,
      resEmployeeName:this.resourceAllocateForm.value.resEmployeeName
    }

    console.log("selected proj_res_list ", proj_res_list);

    this.addProj_Resource_Form.addControl('addProj_Resource_Form_rows', this.addProj_Resource_Form_rows);
    this.addProj_Resource_Form_rows.push(this.createProj_Resource_FormGroup(proj_res_list));
    this.resourceAllocateForm.reset();
  }
  selectedDocument(projectCode){
    console.log("selected Document ", this.documentForm.value);
    var fileName=this.getFileName(this.documentForm.value.documentFile);
    let proj_Doc_list={
      projectCode: projectCode,
      document:this.documentForm.value.document,
      documentFile:fileName,
      documentFileBaseStr:this.documentFileBaseString,
      documentAccessStatus:this.documentForm.value.documentAccessStatus,
      created_by: sessionStorage.getItem('emp_id'),
    }

    console.log("proj_Doc_list -------> "+JSON.stringify(proj_Doc_list));
    this.addProj_Document_Form.addControl('addProj_Document_Form_rows', this.addProj_Document_Form_rows);
    this.addProj_Document_Form_rows.push(this.createProj_Document_FormGroup(proj_Doc_list));
    this.documentForm.reset();
  }

  searchEfforts(efforts) {
    this.effortId = efforts
  }
  calculateHours(hours) {
    if (this.effortType === "Man Month") {
      this.hours = hours * 22 * 8
    } else {
      this.hours = hours * 8
    }
    console.log("this.hours ", this.hours)
  }

  checkStartDate(date) {
    let inputObj = {
      "date": this.convert(date.value),
      "proj_code": sessionStorage.getItem('projectCode')
    };
    this.userService.checkDate(inputObj).subscribe(
      res => {
        console.log("Check Start Date & End Date ", res)
        console.log(res.message)
        if (res.message === "false") {
          // swal.fire({title: "Please enter the valid date based on project start and end date", showConfirmButton: true}).then(result => {
          //   this.activityForm.get('ac_start_date').reset()
          // })
          this.activityForm.get('ac_start_date').reset();
          this.delay(300);
          this.openSnackBar("Please enter the valid date based on project start and end date", "End");

        } else {
          this.getAllocatedHrs()
        }

      },
      err => {
        console.log("Check Start Date & End Date API Error", err)
      }
    )
  }


  checkEndDate(date) {
    let inputObj = {
      "date": this.convert(date.value),
      "proj_code": sessionStorage.getItem('projectCode')
    };
    this.userService.checkDate(inputObj).subscribe(
      res => {
        console.log("Check Start Date & End Date ", res)
        console.log(res.message)
        if (res.message === "false") {
          // swal.fire({title: "Please enter the valid date based on project start and end date", showConfirmButton: true}).then(result => {
          //   this.activityForm.get('ac_end_date').reset()
          // })

          this.activityForm.get('ac_end_date').reset();
          this.delay(300);

          this.openSnackBar("Please enter the valid date based on project start and end date", "End");


        } else {
          this.getAllocatedHrs()
        }

      },
      err => {
        console.log("Check Start Date & End Date API Error", err)
      }
    )
  }



  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  openSnackBar(message1, message2) {

    this._snackBar.open(message1, message2, {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  getAllocatedHrs() {
    var startdate = this.convert(this.activityForm.get('ac_start_date').value)
    var enddate = this.convert(this.activityForm.get('ac_end_date').value)
    console.log("startdate=" + startdate)
    console.log("enddate=" + enddate)

    if (startdate != null && enddate != null) {
      let inputObj = {
        "startDate": startdate,
        "endDate": enddate
      };
      this.userService.getAllocatedHours(inputObj).subscribe(
        res => {
          console.log("Check Start Date & End Date ", res)
          console.log(res.message)
          if (res.message != "null") {
            this.allocatedHrs = res.message;
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


  validateResourceAllocatedHrs(hrs) {
    var resAllccatedHrs = this.getallocatedHrstoResource();
    console.log("resAllccatedHrs  ----------> "+resAllccatedHrs);

    if(resAllccatedHrs == null || resAllccatedHrs.trim().length ==0){
      resAllccatedHrs="00:00";
    }

    if (hrs != null || hrs.length != 0 ) {
      let inputObj = {
        "projectCode": sessionStorage.getItem('projectCode'),
        "actvId": this.resourceAllocateForm.value.activityAct,
        "AllocatingResourceHrs": hrs,
        "AllocatedResourceHrs":resAllccatedHrs
      };

      console.log("validateResourceAllocatedHrs inputObj", inputObj);
      // this.userService.validateResourceAllocatedHrs(inputObj).subscribe(
      this.userService.validateResourceAllocateHrsOntime(inputObj).subscribe(
        res => {
          console.log("Check Start Date & End Date ", res)
          console.log(res)
          if (res.message === "false") {
            //alert("Entered Resource Allocation hours is greater then selected Activity allocated Hour")
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
    let empId = event;
    for(var i=0;i<this.projectEmployeeList.length;i++){
      let projectEmployeeobj=this.projectEmployeeList[i];
      if(empId == projectEmployeeobj.empid){
        this.resEmpName=projectEmployeeobj.empname;
      }
    }
  }

  getResourceTypeName(event){
    let restypeid = event;
    for(var i=0;i<this.resource_Arr.length;i++){
      let resource_Arrobj=this.resource_Arr[i];
      if(restypeid==resource_Arrobj[0]){
        this.resResTypeName=resource_Arrobj[1]
      }
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

  documentFileBaseString:any;

  onFileSelect(e){
    if(e.target.files.length>0){
      const file  = e.target.files[0];
      const reader =  new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) =>{
        
      this.documentFileBaseString = reader.result;
    
      }
    }
    }
    getFileName(fullPath){
      var filename = fullPath.replace(/^.*[\\\/]/, '')
      return filename;
    }

    convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

}
