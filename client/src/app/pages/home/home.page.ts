import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, IonVirtualScroll } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  movies: Movie[] = [];  

  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  
  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.moviesService.getMovies()
    .subscribe( movies => {      
      this.movies = movies;      
    });
  }

  // ngOnDestroy() {
  //   this.moviesService.resetMoviePage();
  // }

  loadData(event) {         
      this.moviesService.getMovies()
        .subscribe( movies => {
            //Hide Infinite List Loader on Complete
            event.target.complete();
            
            this.movies.push(...movies );
            //Rerender Virtual Scroll List After Adding New Data
            // this.virtualScroll.checkEnd();

            // App logic to determine if all data is loaded
            // and disable the infinite scroll

            // if (this.movies.length == 5) {
            //   event.target.disabled = true;
            // }
        });
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  onMovieClick( movie: Movie ) {
    this.router.navigate(['/details', movie.id ]);
  }

  scrollToTop() {
    this.content.scrollToTop(400);
  }

}

// api key theMovieDB ca71ff82581ab22a983b7a0987424500
