import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../entities/article'
// import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input()
  public item: Article = {};

  @Input()
  public searchText: string = '';

  public title: string = '';



    /**
   * Constructor
   */
    constructor(
      // private _router: Router,
    ) {
    }

    
  /**
   * OnInit hook
   */
  ngOnInit() {
    this.title = this.highlightMatches(this.item.title, 65)
    // console.log(this.title)
  }

  /**
 * Hiliting text
 */
  public highlightMatches(text: string | undefined, length: number): string {
    // if (this.searchText) {
    //   const regex = new RegExp(this.searchText, 'gi');
    //   this.highlightedText = this.originalText.replace(regex, (match) => `<span class="highlighted">${match}</span>`);
    // } else {
    //   this.highlightedText = this.originalText;
    // }
  
    if (this.searchText && !!text){
    const regex = new RegExp(this.searchText, "gi");
    return this._cutLength(text.replace(regex, (match) => `<span style="highlight">${match}</span>`), length);
    }
    return !!text ? this._cutLength(text, length) : '';
 }

  /**
 * Cut length of string
 */
 private _cutLength(value: string | undefined, length: number): string {
  if (!value) return '';
  if (value.length > length) {
    return value.substring(0, length) + '...';
  }
  return value;
}

// navigateToDestination(id: number | undefined) {
//   if(!!id)
//   this._router.navigate(['/details', id]);
// }

}
