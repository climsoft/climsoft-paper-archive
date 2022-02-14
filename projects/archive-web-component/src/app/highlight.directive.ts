import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onMouseClick() {


    const getLength = this.el.nativeElement.parentElement.childNodes.length;

    console.log('length ',getLength - 1)

    for(let child of this.el.nativeElement.parentElement.childNodes) {
      // if(child.getAttribute('id') == this.el.nativeElement.getAttribute('id')){
      //   console.log("child ",child)
      //   this.renderer.setStyle(child, 'background', '#3399ff');
      // }
      // else {
      //   this.renderer.setStyle(child, 'background', '');
      // }
      if(child == this.el.nativeElement) {
        this.renderer.setStyle(this.el.nativeElement, 'background', '#3399ff');
      }
      else {
          //this.renderer.setStyle(child, 'background', '');
          console.log("child ",child)
          this.renderer.removeStyle(child, 'background');
      }
      
    }
  }

}
