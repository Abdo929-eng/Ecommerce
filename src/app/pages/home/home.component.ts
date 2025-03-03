import { SearchPipe } from './../../shared/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/products/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

private readonly productsService=inject(ProductsService);
private readonly categoriesService=inject(CategoriesService);
private readonly cartService=inject(CartService)
private readonly toastrService=inject(ToastrService)
private readonly bgxSpinnerService=inject(NgxSpinnerService)


product:Iproduct[]=[];
categories:Icategory[]=[];
text:string=""

ngOnInit(): void {
  this.getProductData()

  this.getCategoriesData()
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
getCategoriesData():void{
  this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
   this.categories=res.data
   console.log(res.data);
   
    },
    error:(err)=>{
console.log(err);

    }
  })
}

addProduct(id:string):void{

  this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
   console.log(res);
   this.toastrService.success(res.message , 'freshCart');
   this.cartService.cartNumber.set(res.numOfCartItems)
    },
    error:(err)=>{
   console.log(err);

    }
  })

}

customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  rtl:true,
  dots: true,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}
customMainOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: true,
  rtl:true,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['', ''],
 items: 1 ,
  nav: true
}





}
