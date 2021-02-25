import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
// import { BehaviorSubject } from 'rxjs';
import { ConfirmedValidator } from 'src/app/confimedValidators';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2/dist/sweetalert2.js';
// import swal from 'sweetalert2';
@Component({
  selector: 'app-createpassword',
  templateUrl: './createpassword.component.html',
  styleUrls: ['./createpassword.component.css']
})
export class CreatepasswordComponent  {
  OTP ='';
  password = '';
  confirmpassWord = '';
  response : any;
  @Input() error: string | null;
  form: FormGroup;  
  submitted = false;
  constructor(private fb: FormBuilder,private authService : AppService,
    private router: Router) { 
    this.form = fb.group({
      OTP:['',[Validators.required]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]
    }, { 
      validator: ConfirmedValidator('password', 'confirmpassword')
    })
  }
  
    
  get f(){
    return this.form.controls;
  }
  get otp(){
    return this.form.get('OTP').value
  }
  get Password(){
    return this.form.get('password').value
  }
  get ConfirmPassword(){
    return this.form.get('confirmpassword').value
  }
  submit(){
    this.authService.checkOTP(this.form.get('OTP').value,this.form.get('password').value).subscribe(
        res=> { 
          //alert(res);
          swal.fire({title: res, showCancelButton: true}).then(result => {
            if (result.value) {
              // handle Confirm button click
              // result.value will contain `true` or the input value
            } else {
              // handle dismissals
              // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
            }
          })
           // alert(res);
          console.log("OTP validation completed!");
          if (res==="success") {
           
            this.router.navigate(["../pages/login"]);
          }
         else{
          this.router.navigate(["/pages/createpassword"]);
         }
  
     });
      }

}
  
 