import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:any[] , klma:string): any[] {
    return products.filter( (item)=> item.title.toLowerCase().includes(klma.toLowerCase())  );
  }

}
