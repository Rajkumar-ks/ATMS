import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { IMyDpOptions } from 'mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import swal from 'sweetalert2/dist/sweetalert2.js';

declare const $: any;
@Component({
  selector: 'app-resourcetype',
  templateUrl: './resourcetype.component.html',
  styleUrls: ['./resourcetype.component.css']
})
export class ResourcetypeComponent implements OnInit {

  form: FormGroup;
  editform: FormGroup;


  rows = [];
  public srch = [];
  masterName: any;
  master_id: any;
  resortypeList: any;


  constructor(private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService) {
    this.rows = appService.leaves;
    this.srch = [...this.rows];
    }

  ngOnInit() {

    this.form = this.fb.group({
      'resourceType': new FormControl(
        '', Validators.required,
      ),
    })

    this.editform = this.fb.group({
      'editresourceType': new FormControl(
        '', Validators.required,
      ),
    })

    this.userService.getresortypeList().subscribe(
      res => {
        this.resortypeList = res;
        console.log("Resource Type  List for HR res", this.resortypeList);
      },
      err => {
        console.log("API Failure for Resource Type list for HR");
      }
    );

  }


  get resourceType() {
    return this.form.get('resourceType')
  }
  get editresourceType() {
    return this.editform.get('editresourceType')
  }


  addBusinessUnit() {
   

    let postData=this.form.value
    postData = {
      "emp_id": sessionStorage.getItem('emp_id'),
      "masterName": postData.resourcetype,
      "masterType": "resourcetype"

    }

    this.userService.addMasterRole(postData).subscribe(
      res => {

        console.log("API Success for addMasterRole Resource Type", res);
        this.ngOnInit();
      },
      err => {
        console.log("API Failure for addMasterRole Resource Type", err, err.error.text);
        this.ngOnInit();
      }
    );
    console.log("addMasterRole response", postData)
  }

  reappear(){

    $('#add_Type').modal('show');

  }
  
  addReset(){

    $('#add_Type').modal('show');

  }
  editreappear(){
    $('#edit_resortype').modal('show');


  }


  onConfirm(){

    $('#add_resortype').modal('show');

  }

  edit(masterName,hr_mas_id){

    this.masterName= masterName;
    this.master_id= hr_mas_id;

    console.log(" this.masterName"+ this.masterName)
   
    $('#edit_resortype').modal('show');

  }


  delete(hr_mas_id){
    this.master_id= hr_mas_id;

    $('#delete_resortype_cofirm').modal('show');

  }

  deleteSubmit(){
    let processedData
    processedData = {
     
      "masterId":this.master_id,
      "function" : "delete",
      "status":'0'
    }

    this.postdata(processedData) 

  }

  update(){

    $('#edit_resortype_cofirm').modal('show');


  }

  editSubmit(){
    
    let processedData = this.editform.value
    processedData = {
      "emp_id": sessionStorage.getItem('emp_id'),
      "masterName": processedData.editresourcetype,
      "masterType": "resourcetype",
      "masterId": this.master_id,
      "function" : "edit"
    }

    this.postdata(processedData) 
  }
  postdata(processedData){
    this.userService.editMasterRole(processedData).subscribe(
      res => {

        console.log("API Success for edit Resource Type", res);
        this.ngOnInit();
      },
      err => {
        console.log("API Failure for edit Resource Type", err, err.error.text);
        this.ngOnInit();
      }
    );
    console.log("editMasterRole response", processedData)
  }


}
