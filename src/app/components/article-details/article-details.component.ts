import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet, RouterLink} from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import {Subscription, Subject } from 'rxjs';
import { Article } from '../../entities/article';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {

  public item: Article = {};

  public longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum ornare convallis non etiam tincidunt tincidunt. Non dolor vel purus id. Blandit habitasse volutpat id dolor pretium, sem iaculis. Faucibus commodo mauris enim, turpis blandit. Porttitor facilisi viverra mi lacus lacinia accumsan. Pellentesque gravida ligula bibendum aliquet nulla massa elit. Ac faucibus donec sit morbi pharetra urna. Vel facilisis amet placerat ultrices lobortis proin nulla. Molestie tellus sed pellentesque tortor vitae eu cras nisl. Sem facilisi amet vitae ultrices nullam tellus. Pellentesque eget iaculis morbi at quis eget lacus, aliquam etiam. Neque ipsum, placerat vel convallis nulla orci, nunc etiam. Elementum risus facilisi mauris diam amet et sed.At aliquet id amet, viverra a magna lorem urna. Nibh scelerisque quam quam massa amet, sollicitudin vel non. Gravida laoreet neque tincidunt eu egestas massa vitae nibh. Nec ullamcorper amet tortor, velit. Dictum pellentesque dolor sit duis sed nibh. Euismod rutrum pellentesque semper mattis aliquet ornare. Cursus maecenas massa, arcu ac adipiscing odio facilisis ac eu. In eget ipsum, sed ultrices tempor consequat, elementum cras porta. Sagittis etiam dictumst at duis praesent a. Malesuada odio amet aenean diam. Tincidunt lorem faucibus neque aliquet lobortis feugiat sed aliquam pulvinar. Praesent aliquet ut tempus feugiat placerat quis duis mauris nibh. Eu ullamcorper id feugiat sit risus turpis mi. Tristique posuere sed convallis magna eu vulputate. Cum sit in hac felis blandit. Cursus eu porta lectus mollis nisi, consectetur ac. Ornare vitae lectus iaculis nibh ac et. Adipiscing amet in parturient etiam fames. Facilisi id eu sem in elementum. Lacus, ipsum morbi vel purus ut arcu laoreet id eu. Libero, tincidunt aliquet parturient dolor sapien faucibus nunc. In ipsum suscipit nec pharetra non vitae sagittis aenean sit. Consequat integer sit netus pellentesque scelerisque ut. Elit augue dui viverra facilisi varius. Volutpat iaculis eu ipsum ut. Dui, ut viverra ut amet magna in in varius. Aliquet penatibus pretium feugiat lobortis. Mauris nunc, eu non massa donec sit duis. Libero nascetur mauris, ac in aliquet cras duis donec. Sit porttitor sociis aliquam aliquet odio arcu a viverra. Proin convallis bibendum venenatis non orci id proin vitae. Faucibus eleifend fermentum sit dictum sagittis fermentum. At id nisi, aliquet ut sagittis proin enim.Eget in aenean mi a elit viverra amet urna, diam. Cursus id viverra amet adipiscing. Pretium, amet amet mi mauris urna, maecenas. Risus ut sit quis donec. Lacinia elementum, amet gravida convallis elementum, metus cras. Adipiscing suspendisse etiam tellus tellus arcu. At accumsan rhoncus, fringilla ut scelerisque consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum ornare convallis non etiam tincidunt tincidunt. Non dolor vel purus id. Blandit habitasse volutpat id dolor pretium, sem iaculis. Faucibus commodo mauris enim, turpis blandit.  Porttitor facilisi viverra mi lacus lacinia accumsan. Pellentesque gravida ligula bibendum aliquet nulla massa elit. Ac faucibus donec sit morbi pharetra urna. Vel facilisis amet placerat ultrices lobortis proin nulla."

  public showLong: boolean =  false;

  public loading: boolean = true; 
  
  private id:  number | null = null;

  private subscription: Subscription;

  private _destroy$ = new Subject<void>();



    /**
   * Constructor
   *
   * @param {ArticlesService} _articleService
   */
  constructor(
    private _route: ActivatedRoute,
    private _articleService: ArticlesService,
    ) { 
    this.subscription = _route.params.subscribe(params=>this.id=params['id']);
  }

   /**
   * OnInit hook
   */
  ngOnInit() {
    this._getItem(this.id);
    }

    /**
   * OnDestroy hook
   */
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

    /**
   * Get item
   *
   */
    private _getItem(id: number | null){
      if(!!id)
      this._articleService.getItem(id)
        .pipe(
          takeUntil( this._destroy$ ),
            tap( response => this.item = response),
            tap( () => this.loading = false),
        )
        .subscribe();
    }
}