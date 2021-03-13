import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll, IonVirtualScroll, IonContent } from '@ionic/angular';

import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  movies: Movie[] = [];
  allMovies: Movie[] = [];  

  public searchBar: boolean = false;
  public loading: boolean = false;
  public term: string = '';

  // @HostListener('ionScroll', ['$event']) onContentScroll($event) {
  //   console.log($event)
  // }

  @ViewChild('input') searchInput: { setFocus: () => void; };
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  @ViewChild(IonContent) content: IonContent;
  
  constructor( 
    private moviesService: MoviesService,
  ) { }

  ngOnInit(): void {
    
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

  scrollToTop() {
    this.content.scrollToTop(400);
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
}