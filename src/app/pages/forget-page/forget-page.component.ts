import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-forget-page',
  templateUrl: './forget-page.component.html',
  styleUrls: ['./forget-page.component.css']
})
export class ForgetPageComponent implements OnInit {
   Email = '';
  response : any;

  @Input() error: string | null;

  form: FormGroup;  
  private formSubmitAttempt: boolean;


  constructor(private fb: FormBuilder,
    private authService : AppService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      'email' : new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
         ]),
      });
  }
  get f() {

    return this.form.controls;
  }
  get email(){
    return this.form.get('email');}

    public reset(){
      
      this.authService.getOTP(this.form.get('email').value).subscribe(
        
        res => { 
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
          if(res==="Your OTP is generated. Please verify your Email.")
          {
          console.log("OTP verification");
          this.router.navigate(['pages/createpassword']);
          }
         },
         
        err => {
          console.log("OTP Error");
        }
      );
  
      }
    }