import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../../core/services/order/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder=inject(FormBuilder)
  private readonly OrderService=inject(OrderService)
  private readonly activatedRoute=inject(ActivatedRoute)
   
  cartId:string=""

ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe((p)=>{
   this.cartId= p.get('id')!
  })
}


  checkOutForm:FormGroup=this.formBuilder.group({
    details:[null],
    phone:[null],
    city:[null],
  })




  submitform():void{
    
    this.OrderService.checkOutSession(this.cartId,this.checkOutForm.value).subscribe({
     next:(res)=>{
        if(res.status==='success'){
          open(res.session.url , '_self')
        }
     },
     error:(err)=>{

     }
    }
      
    )
        

  }


}
