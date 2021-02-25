import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator} from 'src/app/confimedValidators';
import { AppService } from 'src/app/app.service';
import swal from 'sweetalert2/dist/sweetalert2.js';
import { mismatchValidators } from 'src/app/mismatchValidators';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent  {
  CurrentPassword='';
  Newpassword = '';
  confirmpassWord = '';
  response : any;
  form: FormGroup;
  constructor(private authService : AppService,private router: Router,private fb: FormBuilder) { 
 
  this.form = fb.group({
    currentpassword:['',[Validators.required]],
    newpassword: ['', [Validators.required]],
    confirmpassword: ['', [Validators.required]]
  },
  { 
    validator:[ mismatchValidators('currentpassword','newpassword'),
    ConfirmedValidator('newpassword','confirmpassword')]

  },

 )
}
get f(){
  return this.form.controls;
}
get currentpassword(){
  return this.form.get('currentpassword').value
}
get newpassword(){
  return this.form.get('newpassword').value
}
get confirmpassword(){
  return this.form.get('confirmpassword').value
}
submit(){
  this.authService.changePassword(this.form.get('currentpassword').value,this.form.get('newpassword').value).subscribe(
    res=> { 
      swal.fire({title: res, showConfirmButton: true}).then(result => {
        if (result.value) {
          // handle Confirm button click
          // result.value will contain `true` or the input value
        } else {
          // handle dismissals
          // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
        }
      })
    if(res==="You entered Existing password is invalid."){
      this.router.navigate(["/pages/changepassword"]);
    }
  else{
    this.router.navigate(["../pages/login"]);
  }
})
}
}

