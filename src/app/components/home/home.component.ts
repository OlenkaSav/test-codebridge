import { Component, OnInit, OnDestroy, HostListener  } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Article } from '../../entities/article';
import { ArticlesService } from 'src/app/services/articles.service';
import { ArticleComponent } from '../article/article.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy  {

  public count: number = 0;

  public items: Article[] = [];

  public filter: string = '';

  public timerVal: any;

  public loading: boolean = true; 

  private _destroy$ = new Subject<void>();

  private offset: number = 0;

  public clientHeight: number=0;

  public offsetHeight: number=0;


  @HostListener( 'window:scroll', ['$event'] ) onScrollEvent( event: Event ) {
    this._lazyLoadingGetData();
  }

  @HostListener( 'window:resize', ['$event'] ) onResize( event: Event ) {
    this._calculateBodyData();
  }

  
  /**
   * Constructor
   *
   * @param {ArticlesService} _articleService
   */
  constructor(
    private _articleService: ArticlesService,
    private _router: Router,
  ) { }

  /**
 * OnInit hook
 */
  ngOnInit() {
    this._subscribeData();
  }

  /**
 * OnDestroy hook
 */
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

    /**
   * Remove spaces
   *
   */
  public removeSpaces() {
    this.filter = this.filter.trim();
  }

  /**
   * Text filter
   *
   * @param {string} val
   */
  public searchArticle( val: string ) {
    this.offset = 0;
    this.items = [];
    clearTimeout( this.timerVal );
    this.timerVal = setTimeout( () => this._subscribeData(val), 1000 );
  }
    
  /**
   * Get data
   *
   */
  private _subscribeData(filter?: string){
    this._articleService.getArticles( this.offset, filter)
      .pipe(
        takeUntil( this._destroy$ ),
          tap( response => this.count = response.count),
          // tap( response => this.items = this.items.push(response['results']),
          tap( response => this._itemsSort(response['results'])), 
          // tap( response => {this.items = response['results'], console.log(this.items) }), 
          tap(() => this.loading = false)
      )
      .subscribe();
  }


  /**
 * LazyLoading data
 */
  private _lazyLoadingGetData() {
    this._calculateBodyData();
    if ( (window.scrollY + this.clientHeight - this.offsetHeight < 1 && window.scrollY + this.clientHeight - this.offsetHeight > -1) ) {
      this.offset = this.offset + 12;
      if (this.offset < this.count){
        this._subscribeData(this.filter);
      }
    }
  }
  

  /**
 * Items sort
 *
 * @param {Article[] | undefined} val
 */
  private _itemsSort( val: Article[] | undefined ) {
    if (!!val?.length && !this.filter) {
      this.items = [...this.items, ...val]
    }
    else if (!!val?.length && !!this.filter){
      let titles: Article[] = [];
      let arrToSort = [...this.items, ...val]
      this.items = arrToSort.reduce((titlefirst, item) => {
        if (!!item.title && item.title.includes(this.filter)) {
          titlefirst.unshift(item);
        } else {titlefirst.push(item)}
        return titlefirst;
      }, titles)
    }
  }

  /**
 * Calculate height for scroll
 *
 * @private
 */
  private _calculateBodyData() {
    this.clientHeight = window.innerHeight || document.documentElement.clientHeight;
    this.offsetHeight = document.body.scrollHeight;
  }
  
}
