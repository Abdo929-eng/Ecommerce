import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {


private readonly categoriesService=inject(CategoriesService)



categories:Icategory[]=[];

ngOnInit(): void {

this.getCategoriesData()  
}
getCategoriesData():void{
  this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
       console.log(res);
       this.categories=res.data
    }
  })
}




}
