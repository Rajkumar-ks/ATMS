import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { IMyDpOptions } from 'mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import swal from 'sweetalert2/dist/sweetalert2.js';

declare const $: any;
@Component({
  selector: 'app-businessunit',
  templateUrl: './businessunit.component.html',
  styleUrls: ['./businessunit.component.css']
})
export class BusinessunitComponent implements OnInit {

  businessUnitform: FormGroup;
  editbusinessUnitform: FormGroup;


  rows = [];
  public srch = [];
  masterName: any;
  master_id: any;
  bUnitList: any;


  constructor(private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService) {
    this.rows = appService.leaves;
    this.srch = [...this.rows];
    }

  ngOnInit() {

    this.businessUnitform = this.fb.group({
      'businessUnit': new FormControl(
        '', Validators.required,
      ),
    })

    this.editbusinessUnitform = this.fb.group({
      'editbusinessUnit': new FormControl(
        '', Validators.required,
      ),
    })

    this.userService.getBunitList().subscribe(
      res => {
        this.bUnitList = res;
        console.log("business unit List for HR res", this.bUnitList);
      },
      err => {
        console.log("API Failure for business unit list for HR");
      }
    );



  }


  get businessUnit() {
    return this.businessUnitform.get('businessUnit')
  }
  get editbusinessUnit() {
    return this.businessUnitform.get('editbusinessUnit')
  }


  addBusinessUnit() {
   

    let postData=this.businessUnitform.value
    postData = {
      "emp_id": sessionStorage.getItem('emp_id'),
      "masterName": postData.businessUnit,
      "masterType": "businessunit"

    }

    this.userService.addMasterRole(postData).subscribe(
      res => {

        console.log("API Success for addMasterRole", res);
        this.ngOnInit();
      },
      err => {
        console.log("API Failure for addMasterRole", err, err.error.text);
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
    $('#edit_bunit').modal('show');


  }


  onConfirm(){

    $('#add_bunit').modal('show');

  }

  edit(masterName,hr_mas_id){

    this.masterName= masterName;
    this.master_id= hr_mas_id;

    console.log(" this.masterName"+ this.masterName)
   
    $('#edit_bunit').modal('show');

  }


  delete(hr_mas_id){
    this.master_id= hr_mas_id;

    $('#delete_bunit_cofirm').modal('show');

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

    $('#edit_bunit_cofirm').modal('show');


  }

  editSubmit(){
    
    let processedData = this.editbusinessUnitform.value
    processedData = {
      "emp_id": sessionStorage.getItem('emp_id'),
      "masterName": processedData.editbusinessUnit,
      "masterType": "businessunit",
      "masterId": this.master_id,
      "function" : "edit"
    }

    this.postdata(processedData) 
  }
  postdata(processedData){
    this.userService.editMasterRole(processedData).subscribe(
      res => {

        console.log("API Success for edit Business unit", res);
        this.ngOnInit();
      },
      err => {
        console.log("API Failure for edit Business unit", err, err.error.text);
        this.ngOnInit();
      }
    );
    console.log("editMasterRole response", processedData)
  }





  

}
