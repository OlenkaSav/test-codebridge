import { Component, OnInit, OnDestroy  } from '@angular/core';
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

  private _destroy$ = new Subject<void>();

  
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
   * Get data
   *
   */
  private _subscribeData(filter?: string){
    this._articleService.getArticles(filter)
      .pipe(
        takeUntil( this._destroy$ ),
          tap( response => this.count = response.count),
          tap( response => this.items = response['results'] ), 
      )
      .subscribe();
  }

  /**
 * Text filter
 *
 * @param {string} val
 */
  public searchArticle( val: string ) {
    clearTimeout( this.timerVal );
    this.timerVal = setTimeout( () => this._subscribeData(val), 1000 );
  }

  navigateToDestination(id: number) {
    this._router.navigate([`article/:${id}`]);
  }
}
