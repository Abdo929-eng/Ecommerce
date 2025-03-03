import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Interface } from 'readline';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

private readonly activatedRoute=inject(ActivatedRoute)
private readonly productsService=inject(ProductsService)
private readonly cartService=inject(CartService)
private readonly toastrService=inject(ToastrService)

detailsProduct:Iproduct|null=null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
        
     let idProduct=p.get('id')

    this.productsService.getSpecificProducts(idProduct).subscribe({
      next:(res)=>{
       this.detailsProduct=res.data
       console.log(res.data);
       
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  
        
      }
    })
  }

  
addProduct(id:string):void{

  this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
   console.log(res);
   this.toastrService.success(res.message , 'freshCart')
   this.cartService.cartNumber.set(res.numOfCartItems)
    },
    error:(err)=>{
   console.log(err);

    }
  })

}

}
