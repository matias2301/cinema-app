import { Component, ViewChild, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, IonVirtualScroll } from '@ionic/angular';
import { IonContent, IonItemSliding, Platform } from '@ionic/angular';

import { MoviesService } from '../../services/movies.service';
import { AlertsService } from '../../services/alerts.service';
import { AuthService } from '../../services/auth.service';
import { FavouritesService } from '../../services/favourites.service';

import { Movie } from '../../interfaces/movie-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  movies: Movie[] = [];
  allMovies: Movie[] = [];  
  desktop: boolean = false;

  public isLoggedIn: boolean;
  public searchBar: boolean = false;
  public loading: boolean = false;
  public term: string = '';

  // @HostListener('ionScroll', ['$event']) onContentScroll($event) {
  //   console.log($event)
  // }

  @ViewChild(IonContent) content: IonContent;
  @ViewChild('input') searchInput: { setFocus: () => void; };
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  
  constructor(
    private authService: AuthService,
    private moviesService: MoviesService,
    private alertsService: AlertsService,
    private favouritesService: FavouritesService,
    private router: Router,
    private plt: Platform  
  ) { }

  ngOnInit(): void {

    this.checkLoginState();
    if(this.plt.width() > 389) this.desktop = true;

    this.moviesService.getMovies()
    .subscribe( movies => {      
      this.allMovies = movies;
      this.movies = this.allMovies;
    });
  } 

  // ngOnDestroy() {
  //   this.moviesService.resetMoviePage();
  // }

  loadData(event) {

    console.log('event')
      if (this.searchBar) {
        event.target.disabled = true;
        return
      }
      
      this.moviesService.getMovies()
        .subscribe( movies => {
            //Hide Infinite List Loader on Complete
            event.target.complete();
            
            this.movies.push(...movies );
            //Rerender Virtual Scroll List After Adding New Data
            // this.virtualScroll.checkEnd();

        });
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  onMovieClick( movie: Movie ) {
    this.router.navigate(['/details', movie.id, movie ]);
  }

  scrollToTop() {
    this.content.scrollToTop(400);
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

  searchMovie( term: string ){
    
    this.term = term;

    if(term === ''){
      this.movies = this.allMovies;
      return
    }
    
    this.loading = true;
    this.moviesService.findMovies( term )
      .subscribe( (movies: any) => {               
          this.movies = movies;                 
          this.loading = false;
      });
  }

  showSearchBar(){    
    this.searchBar = !this.searchBar;
    
    if( this.searchBar ){
      setTimeout(() => {
        this.searchInput.setFocus();  
      }, 500);
    } else {
      this.term = '';
      this.movies = this.allMovies;
    }
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