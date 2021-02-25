import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-employee-user-regisration',
  templateUrl: './employee-user-regisration.component.html',
  styleUrls: ['./employee-user-regisration.component.css']
})
export class EmployeeUserRegisrationComponent implements OnInit {

  isButtonBankDetails = false;
  isButtonDocumentDetails = false;
  isButtonEducationalDetails = false;
  isTechnicalSkillsDetails = false;
  isCertificationDetails = false;
  isPreEmpDetails = false;
  isFamilyDetails = false;

  form : FormGroup;

  public myDatePickerOptions1: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '38px'
  };

  public myDatePickerOptions2: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '38px'
  };

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      'city' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'phone_number' : new FormControl('', [
        Validators.required,
      ]),
      'emergency_contact_person_name' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'emergency_contact_person_number' : new FormControl('', [
        Validators.required,
      ]),
      'per_addr' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'tem_addr' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'acc_name' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'acc_num' : new FormControl('', [
        Validators.required,
      ]),
      'bank_name' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'ifsc_code' : new FormControl('', [
        Validators.required,
      ]),
      'branch' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'check_copy' : new FormControl('', [
        Validators.required,
      ]),
      'aadhar_num' : new FormControl('', [
        Validators.required,
      ]),
      'aadhar_soft_copy' : new FormControl('', [
        Validators.required,
      ]),
      'pan_soft_copy' : new FormControl('', [
        Validators.required,
      ]),
      'uan_number' : new FormControl('', [
        Validators.required,
      ]),
      'pass_no' : new FormControl('', [
        Validators.required,
      ]),
      'pass_exp_date' : new FormControl('', [
        Validators.required,
      ]),
      'pass_soft_copy' : new FormControl('', [
        Validators.required,
      ]),
      'x_std' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'institution_name' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'passedout_year' : new FormControl('', [
        Validators.required,
      ]),
      'score' : new FormControl('', [
        Validators.required,
      ]),
      'record_copy' : new FormControl('', [
        Validators.required,
      ]),
      'x_std_2' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'institution_name_2' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'passedout_year_2' : new FormControl('', [
        Validators.required,
      ]),
      'score_2' : new FormControl('', [
        Validators.required,
      ]),
      'record_copy_2' : new FormControl('', [
        Validators.required,
      ]),
      'x_std_3' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'institution_name_3' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'passedout_year_3' : new FormControl('', [
        Validators.required,
      ]),
      'score_3' : new FormControl('', [
        Validators.required,
      ]),
      'record_copy_3' : new FormControl('', [
        Validators.required,
      ]),
      'x_std_4' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'institution_name_4' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'passedout_year_4' : new FormControl('', [
        Validators.required,
      ]),
      'score_4' : new FormControl('', [
        Validators.required,
      ]),
      'record_copy_4' : new FormControl('', [
        Validators.required,
      ]),
      'x_std_5' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'institution_name_5' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'passedout_year_5' : new FormControl('', [
        Validators.required,
      ]),
      'score_5' : new FormControl('', [
        Validators.required,
      ]),
      'record_copy_5' : new FormControl('', [
        Validators.required,
      ]),
      'languages' : new FormControl('', [
        Validators.required,
      ]),
      'databases' : new FormControl('', [
        Validators.required,
      ]),
      'platform' : new FormControl('', [
        Validators.required,
      ]),
      'operating_system' : new FormControl('', [
        Validators.required,
      ]),
      'languages2' : new FormControl('', [
        Validators.required,
      ]),
      'database2' : new FormControl('', [
        Validators.required,
      ]),
      'platform2' : new FormControl('', [
        Validators.required,
      ]),
      'operating_system2' : new FormControl('', [
        Validators.required,
      ]),
      'languages3' : new FormControl('', [
        Validators.required,
      ]),
      'database3' : new FormControl('', [
        Validators.required,
      ]),
      'platform3' : new FormControl('', [
        Validators.required,
      ]),
      'operating_system3' : new FormControl('', [
        Validators.required,
      ]),
      'languages4' : new FormControl('', [
        Validators.required,
      ]),
      'database4' : new FormControl('', [
        Validators.required,
      ]),
      'platform4' : new FormControl('', [
        Validators.required,
      ]),
      'operating_system4' : new FormControl('', [
        Validators.required,
      ]),
      'languages5' : new FormControl('', [
        Validators.required,
      ]),
      'database5' : new FormControl('', [
        Validators.required,
      ]),
      'platform5' : new FormControl('', [
        Validators.required,
      ]),
      'operating_system5' : new FormControl('', [
        Validators.required,
      ]),
      'certification' : new FormControl('', [
        Validators.required,
      ]),
      'year' : new FormControl('', [
        Validators.required,
      ]),
      'valid_till' : new FormControl('', [
        Validators.required,
      ]),
      'record_copy_cert' : new FormControl('', [
        Validators.required,
      ]),
      'certification1' : new FormControl('', [
        Validators.required,
      ]),
      'year1' : new FormControl('', [
        Validators.required,
      ]),
      'valid_till1' : new FormControl('', [
        Validators.required,
      ]),
      'record_copy_cert1' : new FormControl('', [
        Validators.required,
      ]),
      'certification2' : new FormControl('', [
        Validators.required,
      ]),
      'year2' : new FormControl('', [
        Validators.required,
      ]),
      'valid_till2' : new FormControl('', [
        Validators.required,
      ]),
      'record_copy_cert2' : new FormControl('', [
        Validators.required,
      ]),
      'certification3' : new FormControl('', [
        Validators.required,
      ]),
      'year3' : new FormControl('', [
        Validators.required,
      ]),
      'valid_till3' : new FormControl('', [
        Validators.required,
      ]),
      'record_copy_cert3' : new FormControl('', [
        Validators.required,
      ]),
      'certification4' : new FormControl('', [
        Validators.required,
      ]),
      'year4' : new FormControl('', [
        Validators.required,
      ]),
      'valid_till4' : new FormControl('', [
        Validators.required,
      ]),
      'record_copy_cert4' : new FormControl('', [
        Validators.required,
      ]),
      'name_addr' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'doj' : new FormControl('', [
        Validators.required,
      ]),
      'designation' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'salary_on_joining' : new FormControl('', [
        Validators.required,
      ]),
      'date_of_relieving' : new FormControl('', [
        Validators.required,
      ]),
      'designation_on_relieving' : new FormControl('', [
        Validators.required,
      ]),
      'salary_on_relieving' : new FormControl('', [
        Validators.required,
      ]),
      'record_copy_emp' : new FormControl('', [
        Validators.required,
      ]),
      'name_addr1' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'doj1' : new FormControl('', [
        Validators.required,
      ]),
      'designation1' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'salary_on_joining1' : new FormControl('', [
        Validators.required,
      ]),
      'date_of_relieving1' : new FormControl('', [
        Validators.required,
      ]),
      'designation_on_relieving1' : new FormControl('', [
        Validators.required,
      ]),
      'salary_on_relieving1' : new FormControl('', [
        Validators.required,
      ]),
      'record_copy_emp1' : new FormControl('', [
        Validators.required,
      ]),
      'name_addr2' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'doj2' : new FormControl('', [
        Validators.required,
      ]),
      'designation2' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'salary_on_joining2' : new FormControl('', [
        Validators.required,
      ]),
      'date_of_relieving2' : new FormControl('', [
        Validators.required,
      ]),
      'designation_on_relieving2' : new FormControl('', [
        Validators.required,
      ]),
      'salary_on_relieving2' : new FormControl('', [
        Validators.required,
      ]),
      'record_copy_emp2' : new FormControl('', [
        Validators.required,
      ]),
      'name_addr3' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'doj3' : new FormControl('', [
        Validators.required,
      ]),
      'designation3' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'salary_on_joining3' : new FormControl('', [
        Validators.required,
      ]),
      'date_of_relieving3' : new FormControl('', [
        Validators.required,
      ]),
      'designation_on_relieving3' : new FormControl('', [
        Validators.required,
      ]),
      'salary_on_relieving3' : new FormControl('', [
        Validators.required,
      ]),
      'record_copy_emp3' : new FormControl('', [
        Validators.required,
      ]),
      'name_addr4' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'doj4' : new FormControl('', [
        Validators.required,
      ]),
      'designation4' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'salary_on_joining4' : new FormControl('', [
        Validators.required,
      ]),
      'date_of_relieving4' : new FormControl('', [
        Validators.required,
      ]),
      'designation_on_relieving4' : new FormControl('', [
        Validators.required,
      ]),
      'salary_on_relieving4' : new FormControl('', [
        Validators.required,
      ]),
      'record_copy_emp4' : new FormControl('', [
        Validators.required,
      ]),
      'name' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'relationship' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'dob' : new FormControl('', [
        Validators.required,
      ]),
      'occupation' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'name1' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'relationship1' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'dob1' : new FormControl('', [
        Validators.required,
      ]),
      'occupation1' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'name2' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'relationship2' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'dob2' : new FormControl('', [
        Validators.required,
      ]),
      'occupation2' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'name3' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'relationship3' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'dob3' : new FormControl('', [
        Validators.required,
      ]),
      'occupation3' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'name4' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'relationship4' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'dob4' : new FormControl('', [
        Validators.required,
      ]),
      'occupation4' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'school_name' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'school_passed_out' : new FormControl('', [
        Validators.required,
      ]),
      'college_name' : new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      'college_passed_out' : new FormControl('', [
        Validators.required,
      ]),
      
    });
  }

  get city(){
    return this.form.get('city')
  }
  get phone_number(){
    return this.form.get('phone_number')
  }
  get emergency_contact_person_name(){
    return this.form.get('emergency_contact_person_name')
  }
  get emergency_contact_person_number(){
    return this.form.get('emergency_contact_person_number')
  }
  get per_addr(){
    return this.form.get('per_addr')
  }
  get tem_addr(){
    return this.form.get('tem_addr')
  }
  get acc_name(){
    return this.form.get('acc_name')
  }
  get acc_num(){
    return this.form.get('acc_num')
  }
  get bank_name(){
    return this.form.get('bank_name')
  }
  get ifsc_code(){
    return this.form.get('ifsc_code')
  }
  get branch(){
    return this.form.get('branch')
  }
  get check_copy(){
    return this.form.get('check_copy')
  }
  get aadhar_num(){
    return this.form.get('aadhar_num')
  }
  get aadhar_soft_copy(){
    return this.form.get('aadhar_soft_copy')
  }
  get pan_soft_copy(){
    return this.form.get('pan_soft_copy')
  }
  get uan_number(){
    return this.form.get('uan_number')
  }
  get pass_no(){
    return this.form.get('pass_no')
  }
  get pass_exp_date(){
    return this.form.get('pass_exp_date')
  }
  get pass_soft_copy(){
    return this.form.get('pass_soft_copy')
  }
  get x_std(){
    return this.form.get('x_std')
  }
  get institution_name(){
    return this.form.get('institution_name')
  }
  get passedout_year(){
    return this.form.get('passedout_year')
  }
  get score(){
    return this.form.get('score')
  }
  get record_copy(){
    return this.form.get('record_copy')
  }
  get x_std_2(){
    return this.form.get('x_std_2')
  }
  get institution_name_2(){
    return this.form.get('institution_name_2')
  }
  get passedout_year_2(){
    return this.form.get('passedout_year_2')
  }
  get score_2(){
    return this.form.get('score_2')
  }
  get record_copy_2(){
    return this.form.get('record_copy_2')
  }
  get x_std_3(){
    return this.form.get('x_std_3')
  }
  get institution_name_3(){
    return this.form.get('institution_name_3')
  }
  get passedout_year_3(){
    return this.form.get('passedout_year_3')
  }
  get score_3(){
    return this.form.get('score_3')
  }
  get record_copy_3(){
    return this.form.get('record_copy_3')
  }
  get x_std_4(){
    return this.form.get('x_std_4')
  }
  get institution_name_4(){
    return this.form.get('institution_name_4')
  }
  get passedout_year_4(){
    return this.form.get('passedout_year_4')
  }
  get score_4(){
    return this.form.get('score_4')
  }
  get record_copy_4(){
    return this.form.get('record_copy_4')
  }
  get x_std_5(){
    return this.form.get('x_std_5')
  }
  get institution_name_5(){
    return this.form.get('institution_name_5')
  }
  get passedout_year_5(){
    return this.form.get('passedout_year_5')
  }
  get score_5(){
    return this.form.get('score_5')
  }
  get record_copy_5(){
    return this.form.get('record_copy_5')
  }
  get languages(){
    return this.form.get('languages')
  }
  get databases(){
    return this.form.get('databases')
  }
  get platform(){
    return this.form.get('platform')
  }
  get operating_system(){
    return this.form.get('operating_system')
  }
  get languages2(){
    return this.form.get('languages2')
  }
  get database2(){
    return this.form.get('database2')
  }
  get platform2(){
    return this.form.get('platform2')
  }
  get operating_system2(){
    return this.form.get('operating_system2')
  }
  get languages3(){
    return this.form.get('languages3')
  }
  get database3(){
    return this.form.get('database3')
  }
  get platform3(){
    return this.form.get('platform3')
  }
  get operating_system3(){
    return this.form.get('operating_system3')
  }
  get languages4(){
    return this.form.get('languages4')
  }
  get database4(){
    return this.form.get('database4')
  }
  get platform4(){
    return this.form.get('platform4')
  }
  get operating_system4(){
    return this.form.get('operating_system4')
  }
  get languages5(){
    return this.form.get('languages5')
  }
  get database5(){
    return this.form.get('database5')
  }
  get platform5(){
    return this.form.get('platform5')
  }
  get certification(){
    return this.form.get('certification')
  }
  get year(){
    return this.form.get('year')
  }
  get valid_till(){
    return this.form.get('valid_till')
  }
  get record_copy_cert(){
    return this.form.get('record_copy_cert')
  }
  get certification1(){
    return this.form.get('certification1')
  }
  get year1(){
    return this.form.get('year1')
  }
  get valid_till1(){
    return this.form.get('valid_till1')
  }
  get record_copy_cert1(){
    return this.form.get('record_copy_cert1')
  }
  get certification2(){
    return this.form.get('certification2')
  }
  get year2(){
    return this.form.get('year2')
  }
  get valid_till2(){
    return this.form.get('valid_till2')
  }
  get record_copy_cert2(){
    return this.form.get('record_copy_cert2')
  }
  get certification3(){
    return this.form.get('certification3')
  }
  get year3(){
    return this.form.get('year3')
  }
  get valid_till3(){
    return this.form.get('valid_till3')
  }
  get record_copy_cert3(){
    return this.form.get('record_copy_cert3')
  }
  get certification4(){
    return this.form.get('certification4')
  }
  get year4(){
    return this.form.get('year4')
  }
  get valid_till4(){
    return this.form.get('valid_till4')
  }
  get record_copy_cert4(){
    return this.form.get('record_copy_cert4')
  }

  get operating_system5(){
    return this.form.get('operating_system5')
  }
  get name_addr(){
    return this.form.get('name_addr')
  }
  get doj(){
    return this.form.get('doj')
  }
  get designation(){
    return this.form.get('designation')
  }
  get salary_on_joining(){
    return this.form.get('salary_on_joining')
  }
  get date_of_relieving(){
    return this.form.get('date_of_relieving')
  }
  get designation_on_relieving(){
    return this.form.get('designation_on_relieving')
  }
  get salary_on_relieving(){
    return this.form.get('salary_on_relieving')
  }
  get record_copy_emp(){
    return this.form.get('record_copy_emp')
  }
  get name_addr1(){
    return this.form.get('name_addr1')
  }
  get doj1(){
    return this.form.get('doj1')
  }
  get designation1(){
    return this.form.get('designation1')
  }
  get salary_on_joining1(){
    return this.form.get('salary_on_joining1')
  }
  get date_of_relieving1(){
    return this.form.get('date_of_relieving1')
  }
  get designation_on_relieving1(){
    return this.form.get('designation_on_relieving1')
  }
  get salary_on_relieving1(){
    return this.form.get('salary_on_relieving1')
  }
  get record_copy_emp1(){
    return this.form.get('record_copy_emp1')
  }
  get name_addr2(){
    return this.form.get('name_addr2')
  }
  get doj2(){
    return this.form.get('doj2')
  }
  get designation2(){
    return this.form.get('designation2')
  }
  get salary_on_joining2(){
    return this.form.get('salary_on_joining2')
  }
  get date_of_relieving2(){
    return this.form.get('date_of_relieving2')
  }
  get designation_on_relieving2(){
    return this.form.get('designation_on_relieving2')
  }
  get salary_on_relieving2(){
    return this.form.get('salary_on_relieving2')
  }
  get record_copy_emp2(){
    return this.form.get('record_copy_emp2')
  }
  get name_addr3(){
    return this.form.get('name_addr3')
  }
  get doj3(){
    return this.form.get('doj3')
  }
  get designation3(){
    return this.form.get('designation3')
  }
  get salary_on_joining3(){
    return this.form.get('salary_on_joining3')
  }
  get date_of_relieving3(){
    return this.form.get('date_of_relieving3')
  }
  get designation_on_relieving3(){
    return this.form.get('designation_on_relieving3')
  }
  get salary_on_relieving3(){
    return this.form.get('salary_on_relieving3')
  }
  get record_copy_emp3(){
    return this.form.get('record_copy_emp3')
  }
  get name_addr4(){
    return this.form.get('name_addr4')
  }
  get doj4(){
    return this.form.get('doj4')
  }
  get designation4(){
    return this.form.get('designation4')
  }
  get salary_on_joining4(){
    return this.form.get('salary_on_joining4')
  }
  get date_of_relieving4(){
    return this.form.get('date_of_relieving4')
  }
  get designation_on_relieving4(){
    return this.form.get('designation_on_relieving4')
  }
  get salary_on_relieving4(){
    return this.form.get('salary_on_relieving4')
  }
  get record_copy_emp4(){
    return this.form.get('record_copy_emp4')
  }
  get name(){
    return this.form.get('name')
  }
  get relationship(){
    return this.form.get('relationship')
  }
  get dob(){
    return this.form.get('dob')
  }
  get occupation(){
    return this.form.get('occupation')
  }
  get name1(){
    return this.form.get('name1')
  }
  get relationship1(){
    return this.form.get('relationship1')
  }
  get dob1(){
    return this.form.get('dob1')
  }
  get occupation1(){
    return this.form.get('occupation1')
  }
  get name2(){
    return this.form.get('name2')
  }
  get relationship2(){
    return this.form.get('relationship2')
  }
  get dob2(){
    return this.form.get('dob2')
  }
  get occupation2(){
    return this.form.get('occupation2')
  }
  get name3(){
    return this.form.get('name3')
  }
  get relationship3(){
    return this.form.get('relationship3')
  }
  get dob3(){
    return this.form.get('dob3')
  }
  get occupation3(){
    return this.form.get('occupation3')
  }
  get name4(){
    return this.form.get('name4')
  }
  get relationship4(){
    return this.form.get('relationship4')
  }
  get dob4(){
    return this.form.get('dob4')
  }
  get occupation4(){
    return this.form.get('occupation4')
  }
  get school_name(){
    return this.form.get('school_name')
  }
  get school_passed_out(){
    return this.form.get('school_passed_out')
  }
  get college_name(){
    return this.form.get('college_name')
  }
  get college_passed_out(){
    return this.form.get('college_passed_out')
  }

  BankDetails(){
    this.isButtonBankDetails = !this.isButtonBankDetails
    console.log("event ", this.isButtonBankDetails)
  }

  documentDetails(){
    this.isButtonDocumentDetails = !this.isButtonDocumentDetails
    console.log("event ", this.isButtonDocumentDetails)
  }

  educationDetails(){
    this.isButtonEducationalDetails = !this.isButtonEducationalDetails
    console.log("event ", this.isTechnicalSkillsDetails)
  }
  technicalSkillsDetails(){
    this.isTechnicalSkillsDetails = !this.isTechnicalSkillsDetails
  }
  certificationDetails(){
    this.isCertificationDetails = !this.isCertificationDetails
  }
  preEmpDetails(){
    this.isPreEmpDetails = !this.isPreEmpDetails
  }
  familyDetails(){
    this.isFamilyDetails = !this.isFamilyDetails
  }
  addSubmit(){
    
  }
}
