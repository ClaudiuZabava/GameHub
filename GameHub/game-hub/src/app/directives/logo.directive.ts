import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLogo]'
})
export class LogoDirective {

  constructor(private el: ElementRef,
              private renderer: Renderer2) {this.setFont('cursive')}
  
  setFont(val: string)
  {
    this.renderer.setStyle(this.el.nativeElement, 'fontFamily', val);
  }


}
