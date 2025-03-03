import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
          

  constructor(private httpClient:HttpClient) { }
  
  myToken:any=localStorage.getItem('userToken')     //  !  or >>>>>myToken:any
 
  cartNumber:WritableSignal<number>=signal(0)



addProductToCart(id:string):Observable<any>{
  return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/cart',
    {
      "productId": id
  },

  {
    headers:{token:this.myToken }     
  }


  )
}

getLoggedUserCart():Observable<any>{
  return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/cart',{
    headers:{token:this.myToken } 
  })
}

removeSpecificCartItem(id:string):Observable<any>{
  return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    headers:{
      token:this.myToken 
    }
  })
}

updateCartQuantity(id:string,newCount:number):Observable<any>{
  return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    'count':newCount
  },
  {
    headers:{
      token:this.myToken 
    }
  })
}


clearCart():Observable<any>{
  return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart` , {
    headers:{
      token:this.myToken
    }
  })
}

}
