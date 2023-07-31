import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../entities/article';

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

  public title = '';

  public content = '';

    /**
   * Constructor
   */
    constructor() {
    }

    
  /**
   * OnInit hook
   */
  ngOnInit() {
    this.title = this.highlightMatches(this.item.title, 65)
    this.content = this.highlightMatches(this.item.summary, 100)

  }

  /**
 * Hiliting text
 */
  public highlightMatches(text: string | undefined, length: number): string {
    if (this.searchText && !!text){
    const regex = new RegExp(this.searchText, "gi");
    return this._cutLength(text.replace(regex, (match) => `<mark style="highlight">${match}</mark>`), length);
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
}
