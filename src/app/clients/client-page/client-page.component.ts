import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../service/user.service';
import { IMyDpOptions } from 'mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import swal from 'sweetalert2/dist/sweetalert2.js';


declare const $: any;

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent implements OnInit {



  form: FormGroup;
  editform: FormGroup;


  res: any;

  rows = [];
  public srch = [];


  page: Number = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  count: Number;
  //editVariable
  edtcli_pr_id: any;
  edtclientName: any;
  edtregion: any;
  edtcountry: any;
  edtstate: any;
  edtplace: any;
  edtcampus: any;
  edtclient_email: any;
  edtinvoice_address: any;
  edtcontactPerson: any;
  edtcltCntctNumber: any;
  edtclientNumber: any;
  clientdetails: any;
  public allClients: boolean = true;
  edtclient_id: any;
  sendClientName = 'All';
  sendRegion = 'All'
  clientList: any;
  RegionList: any;
  show: boolean = false
  deleteid: any;




  constructor(private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService) {
    this.rows = appService.leaves;
    this.srch = [...this.rows];

  }

  ngOnInit() {




    $('.floating').on('focus blur', function (e) {
      $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');



    this.form = this.fb.group({
      'clientName': new FormControl(
        '', Validators.required,
      ),

      'clientNumber': new FormControl(
        '', Validators.required,
      ),
      'region': new FormControl(
        '', Validators.required,
      ),
      'country': new FormControl(
        '', Validators.required,
      ),

      'state': new FormControl(
        '', Validators.required,
      ),
      'place': new FormControl(
        '', Validators.required,
      ),
      'campus': new FormControl(
        '', Validators.required,
      ),
      'client_email': new FormControl(
        '', Validators.required,
      ),
      'invoiceAddress': new FormControl(
        '', Validators.required,
      ),
      'contactPerson': new FormControl(
        '', Validators.required,
      ),
      'cltCntctNumber': new FormControl(
        '', Validators.required,
      ),
    });

    this.editform = this.fb.group({
      'editclientName': new FormControl(
        '', Validators.required,
      ),

      'editclientNumber': new FormControl(
        '', Validators.required,
      ),
      'editregion': new FormControl(
        '', Validators.required,
      ),
      'editcountry': new FormControl(
        '', Validators.required,
      ),

      'editstate': new FormControl(
        '', Validators.required,
      ),
      'editplace': new FormControl(
        '', Validators.required,
      ),
      'editcampus': new FormControl(
        '', Validators.required,
      ),
      'editclient_email': new FormControl(
        '', Validators.required,
      ),
      'editinvoiceAddress': new FormControl(
        '', Validators.required,
      ),
      'editcontactPerson': new FormControl(
        '', Validators.required,
      ),
      'editcltCntctNumber': new FormControl(
        '', Validators.required,
      ),
    });


    this.userService.getRegionlist().subscribe(
      res => {
        this.RegionList = res;

        console.log("Region List res", this.RegionList);
      },
      err => {

        console.log("API Failure for RegionList");
      }
    );

    this.userService.getAllClientlist().subscribe(
      res => {
        this.clientList = res;

        console.log("client List res", this.clientList);
      },
      err => {

        console.log("API Failure for clientList");
      }
    );
    this.getClientListit(this.sendClientName, this.sendRegion, this.page, this.pageSize)


  }

  getClientListit(sendClientName, sendRegion, page, pageSize) {

    this.userService.getClientListitr(sendClientName, sendRegion, page, pageSize).subscribe(
      res => {
        this.clientdetails = res.Data;
        this.count = res.Count
        console.log("Client List", this.clientdetails);
      },
      err => {
        console.log("Client list");
      }
    );

  }

  searchClient(event) {
    this.sendClientName = event.trim()
    console.log(event)
    this.getClientListit(this.sendClientName, this.sendRegion, this.page, this.pageSize);
  }


  searchRegion(event) {
    this.sendRegion = event
    console.log(event)
    this.getClientListit(this.sendClientName, this.sendRegion, this.page, this.pageSize);

  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.getClientListit(this.sendClientName, this.sendRegion, this.page, this.pageSize);

  }

  handlePageChange(pageNo) {
    this.page = pageNo
    this.getClientListit(this.sendClientName, this.sendRegion, this.page, this.pageSize);
  }




  get clientName() {
    return this.form.get('clientName')
  }

  get clientNumber() {
    return this.form.get('clientNumber')
  }
  get region() {
    return this.form.get('region')
  }
  get state() {
    return this.form.get('state')
  }
  get place() {
    return this.form.get('place')
  }
  get campus() {
    return this.form.get('campus')
  }
  get country() {
    return this.form.get('country')
  }
  get client_email() {
    return this.form.get('client_email')
  }
  get invoiceAddress() {
    return this.form.get('invoiceAddress')
  }
  get contactPerson() {
    return this.form.get('contactPerson')
  }
  get cltCntctNumber() {
    return this.form.get('cltCntctNumber')
  }

  get editclientName() {
    return this.form.get('editclientName')
  }

  get editclientNumber() {
    return this.form.get('editclientNumber')
  }
  get editregion() {
    return this.form.get('editregion')
  }
  get editstate() {
    return this.form.get('editstate')
  }
  get editplace() {
    return this.form.get('editplace')
  }
  get editcampus() {
    return this.form.get('editcampus')
  }
  get editcountry() {
    return this.form.get('editcountry')
  }
  get editclient_email() {
    return this.form.get('editclient_email')
  }
  get editinvoiceAddress() {
    return this.form.get('editinvoiceAddress')
  }
  get editcontactPerson() {
    return this.form.get('editcontactPerson')
  }
  get editcltCntctNumber() {
    return this.form.get('editcltCntctNumber')
  }

  addReset() {
    $('#add_client').modal('show');
    //  $('#getdisplay').modal('show');
  }


  edit(cli_pr_id, Client_Name, client_id, clientNumber, region, country, state, place, campus, client_email, invoice_address, contactPerson, cltCntctNumber) {

    console.log(cli_pr_id, Client_Name, client_id, clientNumber, region, country, state, place, campus, client_email, invoice_address, contactPerson, cltCntctNumber)
    this.edtcli_pr_id = cli_pr_id

    console.log("edtclient_id" + this.edtclient_id)
    this.edtclient_id = client_id,
      this.edtclientName = Client_Name
    console.log("edtclientName" + this.edtclientName)

    this.edtclientNumber = clientNumber
    this.edtregion = region
    console.log("edtregion" + this.edtregion)

    this.edtcountry = country
    this.edtstate = state
    this.edtplace = place
    console.log("edtplace" + this.edtplace)

    this.edtcampus = campus
    this.edtclient_email = client_email
    this.edtinvoice_address = invoice_address
    this.edtcontactPerson = contactPerson
    this.edtcltCntctNumber = cltCntctNumber

    this.editform.patchValue({
      editclientName: Client_Name,
      editclientNumber: clientNumber,
      editregion: region,
      editcountry: country,
      editstate: state,
      editplace: place,
      editcampus: campus,
      editclient_email: client_email,
      editinvoiceAddress: invoice_address,
      editcontactPerson:contactPerson,
      editcltCntctNumber: cltCntctNumber

    });

    
    
    $('#edit_client').modal('show');

  }

  viewProfile(item) {

    $('#view_profile').modal('show');
    this.edtcli_pr_id = item.cli_pr_id
    this.edtclientName = item.Client_Name
    this.edtclient_id = item.client_id
    this.edtclientNumber = item.clientNumber
    this.edtregion = item.region
    this.edtcountry = item.country
    this.edtstate = item.state
    this.edtplace = item.place
    this.edtcampus = item.campus
    this.edtclient_email = item.client_email
    this.edtinvoice_address = item.invoice_address
    this.edtcontactPerson = item.contactPerson
    this.edtcltCntctNumber = item.cltCntctNumber
    this.ngOnInit();


  }

  reappear() {
    $('#add_client').modal('show');

  }

  onSubmit() {
    console.log(this.form.value)
    $('#submit_clent').modal('show');

  }
  confirm() {
    console.log(JSON.stringify(this.form.value))
    let postData = this.form.value
    postData = {
      "emp_id": sessionStorage.getItem('emp_id'),
      "clientName": postData.clientName,
      "clientNumber": postData.clientNumber,
      "region": postData.region,
      "country": postData.country,
      "state": postData.state,
      "place": postData.place,
      "campus": postData.campus,
      "client_email": postData.client_email,
      "invoice_address": postData.invoiceAddress,
      "contactPerson": postData.contactPerson,
      "cltCntctNumber": postData.cltCntctNumber,

    }

    this.userService.addClient(postData).subscribe(
      res => {

        console.log("API Success for Client", res);
        this.ngOnInit();
      },
      err => {
        console.log("API Failure for Client", err, err.error.text);
        this.ngOnInit();
      }
    );
    console.log("Client response", postData)


  }
  submitEdit() {
    console.log(this.editform.value)

    $('#edit_submit_clent').modal('show');
  }



  confirmSubmitEdit() {
    console.log(JSON.stringify(this.editform.value))
    let processedData = this.editform.value
    processedData = {
      "cli_pr_id": this.edtcli_pr_id,
      "emp_id": sessionStorage.getItem('emp_id'),
      "clientName": processedData.editclientName,
      "clientNumber": processedData.editclientNumber,
      "region": processedData.editregion,

      "country": processedData.editcountry,
      "state": processedData.editstate,
      "place": processedData.editplace,
      "campus": processedData.editcampus,
      "client_email": processedData.editclient_email,
      "invoice_address": processedData.editinvoiceAddress,
      "contactPerson": processedData.editcontactPerson,
      "cltCntctNumber": processedData.editcltCntctNumber,
      "status": "edit"

    }
    console.log("processedData" + processedData)

    this.postData(processedData);
    this.getClientListit(this.sendClientName, this.sendRegion, this.page, this.pageSize)
    this.editform.reset();
    this.ngOnInit();

  }

  reappearedit() {
    $('#edit_client').modal('show');
  }

  delete(cli_pr_id) {
    this.deleteid = cli_pr_id

    $('#delete_submit_clent').modal('show');


  }
  confirmSubmitDelete() {
    let processedData = {
      "status": "delete",
      "cli_pr_id": this.deleteid,
      "emp_id": sessionStorage.getItem('emp_id')

    }

    console.log("processedData : " + processedData)
    this.postData(processedData);
    this.ngOnInit();

  }



  postData(processedData) {
    this.userService.editClient(processedData).subscribe(
      res => {
        console.log("API Success for editClient", res);
      },
      err => {
        console.log("API Failure for editClient", err, err.error.text);
      }

    );
    console.log("editClient response", processedData)
    this.ngOnInit();


  }
  showReason(reason: string) {
    swal.fire({
      title: "Invoice Address",
      html: reason,
      confirmButtonText: "Ok",
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressChar(event: any) {
    const pattern = /^[a-zA-Z\s]*$/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}


