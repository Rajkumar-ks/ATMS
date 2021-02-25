import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { IMyDpOptions } from 'mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import swal from 'sweetalert2/dist/sweetalert2.js';

declare const $: any;

@Component({
  selector: 'app-roletype',
  templateUrl: './roletype.component.html',
  styleUrls: ['./roletype.component.css']
})
export class RoletypeComponent implements OnInit {

  form: FormGroup;
  editform: FormGroup;


  rows = [];
  public srch = [];
  masterName: any;
  master_id: any;
  roletypeList: any;


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
      'roletype': new FormControl(
        '', Validators.required,
      ),
    })

    this.editform = this.fb.group({
      'editroletype': new FormControl(
        '', Validators.required,
      ),
    })

    this.userService.getroletypeList().subscribe(
      res => {
        this.roletypeList = res;
        console.log("Resource Type  List for HR res", this.roletypeList);
      },
      err => {
        console.log("API Failure for Resource Type list for HR");
      }
    );

  }


  get roletype() {
    return this.form.get('roletype')
  }
  get editroletype() {
    return this.editform.get('editroletype')
  }


  addBusinessUnit() {
   

    let postData=this.form.value
    postData = {
      "emp_id": sessionStorage.getItem('emp_id'),
      "masterName": postData.roletype,
      "masterType": "roletype"

    }

    this.userService.addMasterRole(postData).subscribe(
      res => {

        console.log("API Success for addMasterRole roletype", res);
        this.ngOnInit();
      },
      err => {
        console.log("API Failure for addMasterRole roletype", err, err.error.text);
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
    $('#edit_roletype').modal('show');


  }


  onConfirm(){

    $('#add_roletype').modal('show');

  }

  edit(masterName,hr_mas_id){

    this.masterName= masterName;
    this.master_id= hr_mas_id;

    console.log(" this.masterName"+ this.masterName)
   
    $('#edit_roletype').modal('show');

  }


  delete(hr_mas_id){
    this.master_id= hr_mas_id;

    $('#delete_roletype_cofirm').modal('show');

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

    $('#edit_roletype_cofirm').modal('show');


  }

  editSubmit(){
    
    let processedData = this.editform.value
    processedData = {
      "emp_id": sessionStorage.getItem('emp_id'),
      "masterName": processedData.editroletype,
      "masterType": "roletype",
      "masterId": this.master_id,
      "function" : "edit"
    }

    this.postdata(processedData) 
  }
  postdata(processedData){
    this.userService.editMasterRole(processedData).subscribe(
      res => {

        console.log("API Success for edit roletype", res);
        this.ngOnInit();
      },
      err => {
        console.log("API Failure for edit roletype", err, err.error.text);
        this.ngOnInit();
      }
    );
    console.log("editMasterRole response", processedData)
  }




}
