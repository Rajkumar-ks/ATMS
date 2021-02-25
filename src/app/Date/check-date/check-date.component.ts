import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-check-date',
  templateUrl: './check-date.component.html',
  styleUrls: ['./check-date.component.css']
})
export class CheckDateComponent implements OnInit {

  form: FormGroup; 

  public myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '28px',
  };
  
  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      'startDate' : new FormControl(''),
      'endDate' : new FormControl(''),
      'myStartDate' : new FormControl(''),
      'myEndDate' : new FormControl(''),
    },{validator: this.dateLessThan('myStartDate', 'myEndDate')});
  }

  get startDate(){
    return this.form.get('startDate')
  }
  get endDate(){
    return this.form.get('endDate')
  }
  get myStartDate(){
    return this.form.get('myStartDate')
  }
  get myEndDate(){
    return this.form.get('myEndDate')
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let f = group.controls[from];
      let t = group.controls[to];
      console.log("f, t", f.value.formatted, t.value.formatted)
      if (f.value.formatted > t.value.formatted) {
        return {
          myDates: "Date from should be less than Date to"
        };
      }
      return {};
    }
  }
  addSubmit(){
    console.log(this.form.value)
  }

}
