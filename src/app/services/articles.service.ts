import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Article } from '../entities/article';

const API_URL = `https://api.spaceflightnewsapi.net`;

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

 /**
   * Constructor
   *
   * @param {HttpClient} _http
   */
  constructor(
     private _http: HttpClient,
  ) {}


  /**
   * Get articles
   *
   * @param {string} filter
   */
  public getArticles(offset: number , filter?: string, ): Observable<any> {
    let params = new HttpParams();
    !!filter ? params = params.append('search', !!filter ? filter : '') : null;
    params = params.append('offset', offset);
    params = params.append('limit', 12);
    const options = {
      params,
     }
    return this._http.get<Article[]>( `${API_URL}/v4/articles`, options)
      .pipe(
        tap( () => {
          },
          error => console.error('GET-request error', error) 
        )
      );
  }

  /**
   * Get article item
   *
   * @param {number} id
   */
  public getItem( id?: number ): Observable<any> {
     return this._http.get<Article>( `${API_URL}/v4/articles/${id}`)
      .pipe(
        tap( () => {
          },
          error => console.error('GET-request error', error) 
        )
      );
  }


}
