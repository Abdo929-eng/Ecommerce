import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

private readonly formBuilder=inject(FormBuilder)
private readonly authService=inject(AuthService)
private readonly router=inject(Router)

step:number=1;


verifyEmail:FormGroup=this.formBuilder.group({
  email:[null,[Validators.required , Validators.email]],
})

verifyCode:FormGroup=this.formBuilder.group({
  resetCode:[null,[Validators.required , Validators.pattern(/^[0-9]{6}$/)]],
})

resetPassword:FormGroup=this.formBuilder.group({
  email:[null,[Validators.required , Validators.email]],
  newPassword:[null,[Validators.required , Validators.pattern(/^\w{6,}$/)]],
})



emailSubmit():void{

   let emailvalue=this.verifyEmail.get('email')?.value;
   this.resetPassword.get('email')?.patchValue(emailvalue)

  this.authService.setVerifyEmail(this.verifyEmail.value).subscribe({
   next:(res)=>{
    
    if(res.statusMsg=="success"){
      this.step==2;
    }
    
   },
   error:(err)=>{
    console.log(err);
   }
  })
}
codeSubmit():void{

  
  this.authService.setVerifyCode(this.verifyCode.value).subscribe({
   next:(res)=>{
    if(res.status=="Success"){
      this.step==3;
    }
    
   },
   error:(err)=>{
   console.log(err);
   
   }
  })
}
newpasswordSubmit():void{

  
  this.authService.setresetpassword(this.resetPassword.value).subscribe({
   next:(res)=>{
   localStorage.setItem('userToken', res.token)
   this.authService.safeUserData();
   this.router.navigate(['/home'])
   },
   error:(err)=>{
    console.log(err);
   }
  })
}





}
