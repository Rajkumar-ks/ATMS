import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { IMyDpOptions } from 'mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import swal from 'sweetalert2/dist/sweetalert2.js';

declare const $: any;
@Component({
  selector: 'app-organizationconfiguration',
  templateUrl: './organizationconfiguration.component.html',
  styleUrls: ['./organizationconfiguration.component.css']
})
export class OrganizationconfigurationComponent implements OnInit {

  businessUnitform: FormGroup;
  editbusinessUnitform: FormGroup;

  rows = [];
  public srch = [];
  masterName: any;
  master_id: any;
  bUnitList: any;
  mastertype = 'All';
  selected: any;


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
      'businessunittype': new FormControl(
        '', Validators.required,
      ),
    })

    this.editbusinessUnitform = this.fb.group({
      'editbusinessUnit': new FormControl(
        '', Validators.required,
      ),
      'editbusinessunittype': new FormControl(
        '', Validators.required,
      ),
    })


    this.getClientListit(this.mastertype)


  }


  get businessUnit() {
    return this.businessUnitform.get('businessUnit')
  }
  get businessunittype() {
    return this.businessUnitform.get('businessunittype')
  }
  get editbusinessUnit() {
    return this.editbusinessUnitform.get('editbusinessUnit')
  }
  searchClient(event) {
    this.mastertype = event
    console.log(event)
    this.getClientListit(this.mastertype);
  }
  getClientListit(mastertype) {
    console.log(mastertype)

    this.userService.getBunitList(mastertype).subscribe(
      res => {
        this.bUnitList = res;
        console.log("business unit List for HR res", this.bUnitList);
      },
      err => {
        console.log("API Failure for business unit list for HR");
      }
    );
  }


  addBusinessUnit() {


    let postData = this.businessUnitform.value
    console.log(this.businessUnitform.value)
    postData = {
      "emp_id": sessionStorage.getItem('emp_id'),
      "masterName": postData.businessUnit,
      "masterType": postData.businessunittype

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



  reappear() {

    $('#add_Type').modal('show');

  }

  addReset() {

    $('#add_Type').modal('show');

  }
  editreappear() {
    $('#edit_bunit').modal('show');


  }

  onConfirm() {
    $('#add_bunit').modal('show');
  }

  edit(mastertype, masterName, hr_mas_id) {
    this.mastertype = mastertype;
    this.masterName = masterName;
    this.master_id = hr_mas_id;

    console.log(" this.masterName" + this.masterName)

    $('#edit_bunit').modal('show');


    this.editbusinessUnitform.patchValue({
      editbusinessUnit: masterName,
      editbusinessunittype: mastertype
    })


  }


  delete(hr_mas_id) {
    this.master_id = hr_mas_id;

    $('#delete_bunit_cofirm').modal('show');

  }

  deleteSubmit() {
    let processedData
    processedData = {

      "masterId": this.master_id,
      "function": "delete",
      "status": '0'
    }

    this.postdata(processedData)

  }

  update() {

    $('#edit_bunit_cofirm').modal('show');


  }

  editSubmit() {

    let processedData = this.editbusinessUnitform.value
    console.log("editbusinessuittype" + JSON.stringify(this.editbusinessUnitform.value))
    processedData = {
      "emp_id": sessionStorage.getItem('emp_id'),
      "masterName": processedData.editbusinessUnit,
      "masterType": processedData.editbusinessunittype,
      "masterId": this.master_id,
      "function": "edit"
    }

    this.postdata(processedData)
  }
  postdata(processedData) {
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

  keyPressChar(event: any) {
    const pattern = /^[a-zA-Z\s]*$/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


}
