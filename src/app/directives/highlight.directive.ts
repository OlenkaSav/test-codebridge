import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {

  @Input('appHighlight') searchTerm: string = '';

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm'] && this.searchTerm) {
      const textContent = this.el.nativeElement.textContent;
      const highlightedText = this.highlightSearchTerm(textContent, this.searchTerm);
      console.log(highlightedText)
      this.el.nativeElement.innerHTML = highlightedText;
    }
  }

  private highlightSearchTerm(text: string, searchTerm: string): string {
    return text.replace(new RegExp(searchTerm, 'gi'), match => `<mark class="highlight">${match}</mark>`);
  }
}