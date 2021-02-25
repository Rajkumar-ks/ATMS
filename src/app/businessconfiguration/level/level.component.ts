import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { IMyDpOptions } from 'mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import swal from 'sweetalert2/dist/sweetalert2.js';

declare const $: any;

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {

  form: FormGroup;
  editform: FormGroup;


  rows = [];
  public srch = [];
  masterName: any;
  master_id: any;
  levelList: any;


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
      'level': new FormControl(
        '', Validators.required,
      ),
    })

    this.editform = this.fb.group({
      'editlevel': new FormControl(
        '', Validators.required,
      ),
    })

    this.userService.getlevelList().subscribe(
      res => {
        this.levelList = res;
        console.log("level  List for HR res", this.levelList);
      },
      err => {
        console.log("API Failure for level list for HR");
      }
    );

  }


  get level() {
    return this.form.get('level')
  }
  get editlevel() {
    return this.editform.get('editlevel')
  }


  addBusinessUnit() {
   

    let postData=this.form.value
    postData = {
      "emp_id": sessionStorage.getItem('emp_id'),
      "masterName": postData.level,
      "masterType": "level"

    }

    this.userService.addMasterRole(postData).subscribe(
      res => {

        console.log("API Success for addMasterRole level", res);
        this.ngOnInit();
      },
      err => {
        console.log("API Failure for addMasterRole level", err, err.error.text);
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
    $('#edit_level').modal('show');


  }


  onConfirm(){

    $('#add_level').modal('show');

  }

  edit(masterName,hr_mas_id){

    this.masterName= masterName;
    this.master_id= hr_mas_id;

    console.log(" this.masterName"+ this.masterName)
   
    $('#edit_level').modal('show');

  }


  delete(hr_mas_id){
    this.master_id= hr_mas_id;

    $('#delete_level_cofirm').modal('show');

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

    $('#edit_level_cofirm').modal('show');


  }

  editSubmit(){
    
    let processedData = this.editform.value
    processedData = {
      "emp_id": sessionStorage.getItem('emp_id'),
      "masterName": processedData.editlevel,
      "masterType": "level",
      "masterId": this.master_id,
      "function" : "edit"
    }

    this.postdata(processedData) 
  }
  postdata(processedData){
    this.userService.editMasterRole(processedData).subscribe(
      res => {

        console.log("API Success for edit level", res);
        this.ngOnInit();
      },
      err => {
        console.log("API Failure for edit level", err, err.error.text);
        this.ngOnInit();
      }
    );
    console.log("editMasterRole response", processedData)
  }




}
