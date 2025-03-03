import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrands } from '../../shared/interfaces/Ibrands/ibrands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

private readonly brandsService=inject(BrandsService)

Brands:Ibrands[]=[];
specBrands:Ibrands={} as Ibrands;

ngOnInit(): void {

this.getBrandsData()  
}
getBrandsData():void{
  this.brandsService.getAllBrands().subscribe({
    next:(res)=>{
       console.log(res.data);
     this.Brands=res.data;
    }
  })
}


specCLick(id:string):void{
  
this.brandsService.getSpecificBrands(id).subscribe({
  next:(res)=>{
     console.log(res.data);
     this.specBrands=res.data
  }
  ,
  error:(err)=>{
    console.log(err);
    
  }
})
}

}
