import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {
  private readonly id=inject(PLATFORM_ID)
  private readonly renderer2=inject(RendererFactory2).createRenderer(null,null)

  constructor(private translateService:TranslateService ) { 
if(isPlatformBrowser(this.id)){
  
  this.translateService.setDefaultLang('en');
  const saveLang=localStorage.getItem('lang');
  if(saveLang){
  this.translateService.use(saveLang !)
  }
  this.changeDirection()

}
  }

  changeDirection():void {
    if(localStorage.getItem('lang') === 'en'){
          // dir ltr
         this.renderer2.setAttribute(document.documentElement , 'dir' , 'ltr');
    }
    else if (localStorage.getItem('lang') === 'ar') {
      //dir rtl
         this.renderer2.setAttribute(document.documentElement , 'dir' , 'rtl');

    }


   }

changelang(lang:string):void{
localStorage.setItem('lang',lang)
this.translateService.use(lang)
this.changeDirection()
}


}
