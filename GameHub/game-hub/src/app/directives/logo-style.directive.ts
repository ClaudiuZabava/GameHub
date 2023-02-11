import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLogoStyle]'
})
export class LogoStyleDirective {


  constructor(private el: ElementRef,
    private renderer: Renderer2) {this.setMainLogoStyle('#430ef0', 'black', '3px', '700', 'sans-serif')}

  setMainLogoStyle(val1: string, val2: string, val3: string, val4 : string, val5: string)
  {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', val1);
      this.renderer.setStyle(this.el.nativeElement, 'color', val2);
      this.renderer.setStyle(this.el.nativeElement, 'border-radius', val3);
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', val4);
      this.renderer.setStyle(this.el.nativeElement, 'fontFamily', val5);
  }

}
