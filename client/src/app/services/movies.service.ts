import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MoviesResponse, Movie, MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private moviePage = 1;
  public loading: boolean = false;

  constructor( private httpClient: HttpClient ) { }

  get params() {
    return {
      api_key: 'ca71ff82581ab22a983b7a0987424500',
      language: 'es-ES',
      page: this.moviePage.toString()
    }
  }

  resetMoviePage() {
    this.moviePage = 1;
  }

  getMovies():Observable<Movie[]> {

    return this.httpClient.get<MoviesResponse>(`${ this.baseUrl }/movie/now_playing`,{
      params: this.params
    }).pipe(
      map( (resp) => resp.results ),
      tap( () => {
        this.moviePage += 1;        
      })
    );
  }


  // findMovies( text: string ):Observable<Movie[]> {

  //   const params = {...this.params, page: '1', query: text };

  //   // https://api.themoviedb.org/3/search/movie
  //   return this.httpClient.get<MoviesResponse>(`${ this.baseUrl }/search/movie`, {
  //     params
  //   }).pipe(
  //     map( resp => resp.results )
  //   )
  // }


  getMovieDetail( id: string ) {

    return this.httpClient.get<MovieResponse>(`${ this.baseUrl }/movie/${ id }`, {
      params: this.params
    }).pipe(
      catchError( err => of(null) )
    )
  }
}