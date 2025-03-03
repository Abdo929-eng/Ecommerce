
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import routes from '../../app.routes';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly authService =inject(AuthService)
  private readonly router=inject(Router);
   private readonly formBuilder=inject(FormBuilder)

  isloading:boolean=false
  msgError:string="";
  isSuccess:string=''

  loginForm:FormGroup=this.formBuilder.group({
    email:[null,[Validators.required , Validators.email]],
    password:[null,[Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)]],
   
  })



submitForm():void{
  if(this.loginForm.valid){
    this.isloading=true
    this.authService.sendLoginForm(this.loginForm.value).subscribe({
      next:(res)=>{
       console.log(res.token);
       if(res.message==="success"){
        this.isSuccess=res.message
        localStorage.setItem('userToken' , res.token)
        this.authService.safeUserData();

       setTimeout(() => {
        this.router.navigate(['/home'])
       }, 500);

       }
       this.isloading=false
       
      }
      ,
      error:(err)=>{
        console.log(err.error.message);
        this.isloading=false
        this.msgError=err.error.message;
        
      }
    })
  }
  
  
  
}


}
