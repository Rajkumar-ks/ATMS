import { AppService } from 'src/app/app.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt'
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private loggedIn = new BehaviorSubject<boolean>(false);
  showErrorMessage = false;
  userName = '';
  passWord = '';
  invalidLogin = false;
  response: any;
  flag = 'true';
  loginDate : any;
  outTime = 'nil';
  loginTime : any;

  @Input() error: string | null;

  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(private router: Router,
    private authService: AppService,
    private userService : UserService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.form = this.fb.group({
      'username': new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      'password': new FormControl('', [
        Validators.required,

      ]),
    });
  }
  get f() {
    return this.form.controls;
  }
  get username() {
    return this.form.get('username')
  }
  get password() {
    return this.form.get('password')
  }
  public onSubmit() {
    if (this.form.value) {
      console.log(JSON.stringify(this.form.value));
      (this.authService.login(this.form.value).subscribe(
        data => {
          this.authService.loginCheck(this.form.get('username').value).subscribe(
            res => {
              if (res === "true") {
                this.router.navigate(['pages/changepassword']);
              }
              else {
                this.router.navigate(['dashboard']);
              }
            }
          )
          console.log(JSON.stringify(data), "login Verified!");
          this.loginDate = new Date();
          sessionStorage.setItem("loginDateTimestamp", this.convert(this.loginDate));
          sessionStorage.setItem("loginDateTime", this.loginDate.getTime());
          sessionStorage.setItem("loginDateHours", this.loginDate.getHours());
          sessionStorage.setItem("loginDateMinutes", this.loginDate.getMinutes());

          this.loginTime = this.formatAMPM()
          console.log("login time ", this.loginTime)
          var attendanceData = {
            'Attendance_date': sessionStorage.getItem("loginDateTimestamp"),
            'inTime': this.loginTime,
            'outTime': this.outTime,
            'emp_id': sessionStorage.getItem('emp_id')
          }

          console.log("attendanceData ", attendanceData)
          this.addAttandance(attendanceData);

          this.loggedIn.next(true);
          this.router.navigate(['dashboard']);
          this.ngOnInit();
        },
        error => {
          this.loggedIn.next(false);
          this.showErrorMessage = true;
          console.log("Email or Password is Invalid!")
        }
      ), (err) => {
        console.log("error");
      }
      );
      this.formSubmitAttempt = true;
    }
  }

  convert(punchInDate){
    var date = new Date(punchInDate),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-"); 
  }

  formatAMPM() {
    var hours = +sessionStorage.getItem('loginDateHours');
    var minutes = sessionStorage.getItem('loginDateMinutes');
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = +minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  addAttandance(postDate){
    this.userService.saveAttendance(postDate).subscribe(
      res => { 
        console.log("Hey Attendance Details Updated!!");
      },
      err => {
        console.log("Update Attendance API error");
      }
    );
  }

}

