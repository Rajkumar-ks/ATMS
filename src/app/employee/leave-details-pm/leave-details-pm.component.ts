import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../service/user.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2/dist/sweetalert2.js';


declare const $: any;

@Component({
    selector: 'app-leave-details-pm',
    templateUrl: './leave-details-pm.component.html',
    styleUrls: ['./leave-details-pm.component.css']
})
export class LeaveDetailsPmComponent implements OnInit {

    public myDatePickerOptions: IMyDpOptions = {
        todayBtnTxt: 'Today',
        dateFormat: 'yyyy-mm-dd',
        firstDayOfWeek: 'su',
        sunHighlight: true,
        inline: false,
        height: '38px'
    };

    leaveListDataRM: any;
    rows = [];
    public srch = [];
    empid = "All";
    statusR = "Pending";
    employeeId: any;
    employeeList: any;
    fromDate: any;
    toDate: any;
    errorMessage: any;
    remarks: any;
    public show: boolean = false;
    conform = "false";

    page: Number = 1;
    pageSize = 5;
    pageSizes = [5, 10, 15];
    count: Number;


    // rejection variables
    tempEmpid: string;
    tempTimeoff_from: string;
    tempTimeoff_to: string;
    tempNo_of_days: any;
    tempStatus: string;
    tempApproved_by: string;
    temPreject_reason: string;
    temptimeoff_type: string;



    constructor(
        private appService: AppService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private userService: UserService) {
        this.rows = appService.leaves;
        this.srch = [...this.rows];
    }

    ngOnInit() {

        this.userService.getEmplist(sessionStorage.getItem('emp_id')).subscribe(
            res => {
                this.employeeList = res;
                this.errorMessage = res.text

                console.log("Employee List res", this.employeeList);
            },
            err => {
                this.errorMessage = err.text

                console.log("API Failure for Project Employee");
            }
        );
        this.empReportApproval("All", "Pending", this.page, this.pageSize);
    }

    searchEmployeeId(event) {
        this.empid = event
        console.log(event)
        this.empReportApproval(this.empid, this.statusR, this.page, this.pageSize);
    }

    searchStatus(event) {
        this.statusR = event
        console.log(event)
        this.empReportApproval(this.empid, this.statusR, this.page, this.pageSize);

    }

    empReportApproval(empid, status, page, pageSize) {
        this.userService.getLeaveHistoryForRM(empid, status, sessionStorage.getItem('emp_id'), page, pageSize).subscribe(
            res => {
                console.log("API Success for Leaves", res);
                this.leaveListDataRM = res.Data
                this.count = res.Count
                console.log(this.empid)
                console.log(this.statusR)
                console.log("************", this.leaveListDataRM)
            },
            err => {
                console.log("API Failure for Leaves", err.message);
            }
        );
    }

    editStatus(id) {
        $('#edit_leave').modal('show');
    }


    toggle() {
        this.show = !this.show;
    }


    rejectLeaveAct() {
        var tempReason = $("#reasonId").val();

        if (tempReason == "") {
            alert("Please enter the reason !!");
            return;
        }

        let processedData = {
            "emp_id": this.tempEmpid,
            "timeoff_from": this.tempTimeoff_from,
            "timeoff_to": this.tempTimeoff_to,
            "no_of_days": this.tempNo_of_days,
            "status": this.tempStatus,
            "approved_by": this.tempApproved_by,
            "reject_reason": tempReason,
            "timeoff_type": this.temptimeoff_type
        }

        console.log("processedData : " + processedData)

        this.postData(processedData);
        this.empReportApproval(this.empid, this.statusR, this.page, this.pageSize);

        this.ngOnInit();

    }


    decline(empid, fromDate, toDate, no_of_days, timeoff_type, remarks) {

        this.tempEmpid = empid;
        this.tempTimeoff_from = fromDate;
        this.tempTimeoff_to = toDate;
        this.tempNo_of_days = no_of_days;
        this.tempStatus = "Rejected";
        this.tempApproved_by = sessionStorage.getItem('emp_id');
        this.temPreject_reason = "";
        this.temptimeoff_type = timeoff_type;

    }

    confirm() {

        console.log(JSON.stringify(this.accept))
        let processedData = {
            "emp_id": this.tempEmpid,
            "timeoff_from": this.tempTimeoff_from,
            "timeoff_to": this.tempTimeoff_to,
            "no_of_days": this.tempNo_of_days,
            "status": this.tempStatus,
            "approved_by": this.tempApproved_by,
            "reject_reason": "null",
            "timeoff_type": this.temptimeoff_type

        }

        this.postData(processedData);

        this.empReportApproval(this.empid, this.statusR, this.page, this.pageSize);
        this.ngOnInit();

    }

    accept(empid, fromDate, toDate, no_of_days, timeoff_type) {
        // $('#approve_leave').modal('show');
        this.tempEmpid = empid;
        this.tempTimeoff_from = fromDate;
        this.tempTimeoff_to = toDate;
        this.tempNo_of_days = no_of_days;
        this.tempStatus = "Approved";
        this.tempApproved_by = sessionStorage.getItem('emp_id');
        this.temPreject_reason = "null";
        this.temptimeoff_type = timeoff_type;


    }

    postData(processedData) {
        this.userService.addLeaveProcess(processedData).subscribe(
            res => {
                console.log("API Success for Leaves", res);
            },
            err => {
                this.errorMessage =
                    console.log("API Failure for Leaves", err, err.error.text);
            }

        );
        console.log("leave response", processedData)

    }

    // cancel(event){
    // this.remarks = event.target.value
    // }
    // rejectCancel(){
    // this.show=true;
    // }

    handlePageSizeChange(event): void {
        this.pageSize = event.target.value;
        this.empReportApproval(this.empid, this.statusR, this.page, this.pageSize);

    }

    handlePageChange(pageNo) {
        this.page = pageNo
        this.empReportApproval(this.empid, this.statusR, this.page, this.pageSize);
    }

    showReason(reason: string) {
        swal.fire({
            title: "Reason",
            html: reason,
            confirmButtonText: "Ok",
        });
    }
}