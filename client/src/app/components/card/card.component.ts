import { Component, OnInit, Input } from '@angular/core';
import { IonItemSliding, Platform } from '@ionic/angular';

import { Router } from '@angular/router';

import { AlertsService } from '../../services/alerts.service';
import { AuthService } from '../../services/auth.service';
import { FavouritesService } from '../../services/favourites.service';

import { Movie } from '../../interfaces/movie-response';
// import { RoutesService } from '../../services/routes.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  desktop: Boolean = false;
  isLoggedIn: Boolean;
  currentUrl: String;

  @Input("movies") movies: Movie[];
  @Input("term") term: String;
  @Input("loading") loading: Boolean[];  

  constructor(
    private authService: AuthService,    
    private alertsService: AlertsService,
    private favouritesService: FavouritesService,
    private router: Router,
    private plt: Platform,
    // private routesService: RoutesService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.checkLoginState();    
    if(this.plt.width() > 389) this.desktop = true;
    this.currentUrl = this.location.path().split('/')[1];       
  }
  

  onMovieClick( movie: Movie ) {
    if( this.currentUrl === 'favourites' ) return;
    this.router.navigate(['/details', movie.id, movie ]);
  }

  addFavourite( movie: Movie, slidingItem: IonItemSliding ) {

    if( !this.isLoggedIn ) {
      this.alertsService.alertModal('Only registered user can add movie to favourites', 'error')
      .then(() => slidingItem.close());
      return;
    }

    const fav = {
      title: movie.title,
      overview: movie.overview,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      backdrop_path: movie.backdrop_path
    }
    
    this.favouritesService.addFavourite(fav)
      .subscribe( res => {          
        this.alertsService.alertToast(res.msg, 'success')
          .then(() => slidingItem.close());

      }, (err) => {
        this.alertsService.alertToast('Something went wrong', 'error');
      });    
  }

  deleteFav( movie: Movie, slidingItem: IonItemSliding, i: number ) {
    this.movies.splice(i, 1);
    this.favouritesService.deleteFavourite(movie);
    slidingItem.close();    
  }

  editFav( movie: Movie, slidingItem: IonItemSliding ) {
    this.router.navigate(['/details', movie._id, movie ]);
    slidingItem.close();
  }
  
  // CHECK LOGIN STATE
  checkLoginState(){
    this.authService.authSubject.subscribe( state => {
      if (state) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

}
