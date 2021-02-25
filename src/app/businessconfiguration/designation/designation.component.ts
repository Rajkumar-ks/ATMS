import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { IMyDpOptions } from 'mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import swal from 'sweetalert2/dist/sweetalert2.js';

declare const $: any;

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  form: FormGroup;
  editform: FormGroup;


  rows = [];
  public srch = [];
  masterName: any;
  master_id: any;
  desigList: any;


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
      'designation': new FormControl(
        '', Validators.required,
      ),
    })

    this.editform = this.fb.group({
      'editdesignation': new FormControl(
        '', Validators.required,
      ),
    })

    this.userService.getdesigList().subscribe(
      res => {
        this.desigList = res;
        console.log("designation unit List for HR res", this.desigList);
      },
      err => {
        console.log("API Failure for designation list for HR");
      }
    );



  }


  get designation() {
    return this.form.get('designation')
  }
  get editdesignation() {
    return this.editform.get('editdesignation')
  }


  addBusinessUnit() {
   

    let postData=this.form.value
    postData = {
      "emp_id": sessionStorage.getItem('emp_id'),
      "masterName": postData.designation,
      "masterType": "designation"

    }

    this.userService.addMasterRole(postData).subscribe(
      res => {

        console.log("API Success for addMasterRole designation", res);
        this.ngOnInit();
      },
      err => {
        console.log("API Failure for addMasterRole designation", err, err.error.text);
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
    $('#edit_desig').modal('show');


  }


  onConfirm(){

    $('#add_desig').modal('show');

  }

  edit(masterName,hr_mas_id){

    this.masterName= masterName;
    this.master_id= hr_mas_id;

    console.log(" this.masterName"+ this.masterName)
   
    $('#edit_desig').modal('show');

  }


  delete(hr_mas_id){
    this.master_id= hr_mas_id;

    $('#delete_desig_cofirm').modal('show');

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

    $('#edit_desig_cofirm').modal('show');


  }

  editSubmit(){
    
    let processedData = this.editform.value
    processedData = {
      "emp_id": sessionStorage.getItem('emp_id'),
      "masterName": processedData.editdesignation,
      "masterType": "designation",
      "masterId": this.master_id,
      "function" : "edit"
    }

    this.postdata(processedData) 
  }
  postdata(processedData){
    this.userService.editMasterRole(processedData).subscribe(
      res => {

        console.log("API Success for edit designation unit", res);
        this.ngOnInit();
      },
      err => {
        console.log("API Failure for edit designation unit", err, err.error.text);
        this.ngOnInit();
      }
    );
    console.log("editMasterRole response", processedData)
  }



}
