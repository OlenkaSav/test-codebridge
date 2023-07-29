import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Article } from '../../entities/article';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ArticleComponent } from '../article/article.component';
import { ArticlesService } from 'src/app/services/articles.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy  {

  public count: number = 0;

  public items: Article[] = [];

  private _destroy$ = new Subject<void>();

  
  /**
   * Constructor
   *
   * @param {ArticlesService} _articleService
   */
  constructor(
    private _articleService: ArticlesService
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
  private _subscribeData(){
    this._articleService.getArticles()
      .pipe(
        takeUntil( this._destroy$ ),
          tap( response => this.count = response.count),
          tap( response => this.items = response['results'] ), 
      )
      .subscribe();

  }
}
