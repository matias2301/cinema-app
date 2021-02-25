import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Favourite } from '../interfaces/favourite';
import { Movie } from '../interfaces/movie-response';

import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  AUTH_SERVER_ADDRESS: string = 'http://localhost:4000'; 

  constructor (
                private httpClient: HttpClient,
                private loadingController: LoadingController,                
                private router: Router,
                private alertsService: AlertsService,              
              ) { }


    addFavourite(fav: Favourite) {

      return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}/api/favs`, fav)
        .pipe(
          map( res => res ),
        );
    }

    uploadFile(fileToUpload: File) {
      
      let httpOptions = {
        headers: new HttpHeaders({
          'enctype': 'multipart/form-data;',
          'Accept': 'plain/text',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token'
        })
      };

      let formData = new FormData();             
      formData.append('image', fileToUpload, fileToUpload.name);

      return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}/api/images`, formData, httpOptions)
        .pipe(
          map( res => res ),
        );      
    }

    getFavourites():Observable<any> {

      return this.httpClient.get<any>(`${ this.AUTH_SERVER_ADDRESS }/api/favs`)
      .pipe(
        map( res => res ),
      );
    }

    deleteFavourite(movie: Movie) {

      this.loadingController.create({keyboardClose: true, message: 'Deleting...'})
      .then(loadingEl => {
        loadingEl.present();
        this.httpClient.delete<any>(`${this.AUTH_SERVER_ADDRESS}/api/favs/${movie._id}`)
        .subscribe(
          res => {             
            loadingEl.dismiss()
              .then(() => {
                this.alertsService.alertToast(res.msg, 'success');
                this.router.navigate(['/favourites']);
              });
          },
          err => {            
            loadingEl.dismiss()
            .then(() => this.alertsService.alertToast('Something went wrong, try again later.', 'error'))
          }
        );
      });
    }

    updateFavourite(id: number, values: any) {
      return this.httpClient.put<any>(`${ this.AUTH_SERVER_ADDRESS }/api/favs/${id}`, values)
        .pipe(
          map( res => res ),
        );
    }

    updateRating( rating: number, movie: Movie ){

      const updateMovie = {
        ...movie
      }
      
      delete updateMovie._id;
      updateMovie.vote_average = rating * 2;
      
      return this.httpClient.put<any>(`${ this.AUTH_SERVER_ADDRESS }/api/favs/${movie._id}`, updateMovie)
        .pipe(
          map( res => res ),
        );
    }
}
