import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRemoveHighlight]'
})
export class RemoveHighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  
  private removeHighlight(color: string) {
    this.el.nativeElement.parentElement.style.backgroundColor = color;
  }

  @HostListener("click") onRemoveFocus() {

    console.log('El ',this.el.nativeElement)

    // for(let child of this.el.nativeElement.parentElement.childNodes) {
    //   console.log("child ",child)
    //   if(child != this.el.nativeElement) {
    //     this.removeHighlight('red')
    //   }
    // }


  }
}
