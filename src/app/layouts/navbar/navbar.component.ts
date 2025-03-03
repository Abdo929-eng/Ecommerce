import { Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate/mytranslate.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
 
 readonly authService=inject(AuthService)     //public to access   direct (no privit)
 private readonly mytranslateService=inject(MytranslateService)
 private readonly translateService=inject(TranslateService)
 private readonly cartService=inject(CartService)

isLogin=input<boolean>(true);
countCart:Signal<number>=computed(()=> this.cartService.cartNumber())
ngOnInit(): void {
  this.cartService.getLoggedUserCart().subscribe({
    next:(res)=>{
      this.cartService.cartNumber.set(res.numOfCartItems)

    }
  })
}


change(lang:string):void{
  this.mytranslateService.changelang(lang)
}

currentLang(lang:string):boolean{
return this.translateService.currentLang ===lang
}
}
