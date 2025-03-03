import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import routes from '../../app.routes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  private readonly authService =inject(AuthService)
  private readonly router=inject(Router);
  private readonly formBuilder=inject(FormBuilder)
  private readonly toastrService=inject(ToastrService)

  isloading:boolean=false
  msgError:string="";
  isSuccess:string=''

  register:FormGroup=this.formBuilder.group({
    name:[null,[Validators.required , Validators.minLength(3),Validators.maxLength(20)]],
    email:[null,[Validators.required , Validators.email]],
    password:[null,[Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)]],
    rePassword:[null,[]],
    phone:[null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  },{validators:this.confirmpassword})







submitForm():void{
 
  if(this.register.valid){
    this.isloading=true
    this.authService.sendRegisterForm(this.register.value).subscribe({
      next:(res)=>{
       console.log(this.register.value);
       if(res.message==="success"){
        this.isSuccess=res.messages

       setTimeout(() => {
        this.router.navigate(['/login'])
       }, 500);

       }
       this.isloading=false
       
      }
      ,
      error:(err)=>{
        console.log(err);
        this.isloading=false
        this.msgError=err.error.message;
        
      }
    })
  }
  else{
    this.register?.setErrors({mismatch:true})
    this.register.markAllAsTouched();
  }
  
  
  
}

confirmpassword(group:AbstractControl){             //  to valid rePassword

const password =group.get('password')?.value
const rePassword =group.get('rePassword')?.value

return password===rePassword? null : {mismatch:true};


}

}
