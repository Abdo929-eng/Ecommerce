import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Icategory } from '../../shared/interfaces/icategory';
import { SearchPipe } from './../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CarouselModule,SearchPipe,FormsModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

private readonly productsService=inject(ProductsService);
private readonly categoriesService=inject(CategoriesService);
private readonly cartService=inject(CartService)
private readonly toastrService=inject(ToastrService)
private readonly bgxSpinnerService=inject(NgxSpinnerService)


product:Iproduct[]=[];

text:string=""

ngOnInit(): void {
  this.getProductData()

  
}


getProductData():void{
  this.productsService.getAllProducts().subscribe({
    next:(res)=>{
   this.product=res.data
    },
    error:(err)=>{

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
