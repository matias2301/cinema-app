import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ModalController, ToastController } from '@ionic/angular';

//services
import { AlertsService } from '../../services/alerts.service';
import { AuthService } from '../../services/auth.service';
import { FavouritesService } from '../../services/favourites.service';
import { RoutesService } from '../../services/routes.service';

import { FormModalPage } from '../../modals/form-modal/form-modal.page';
import { Movie } from '../../interfaces/movie-response';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  // public movie: Movie;
  movie: any;
  isLoggedIn: boolean;  
  toastPresent: boolean;
  edit: boolean = false;

  constructor (
                private activatedRoute: ActivatedRoute,                
                private alertsService: AlertsService,
                private authService: AuthService,
                private favouritesService: FavouritesService,
                private routesService: RoutesService,
                private location: Location,
                public toastController: ToastController,
                public modalController: ModalController
              ) {
                // this.previousUrl = this.previousRouteService.getPreviousUrl();
                this.routesService.prevUrl.subscribe( prevUrl => {                  
                  
                  if(prevUrl === '/favourites'){
                    this.edit = true;
                  }              
                });                
              }

  ngOnInit(): void {
    
    // const { id } = this.activatedRoute.snapshot.params;
    // this.moviesService.getMovieDetail( id ).subscribe( movie => {
    //   if ( !movie ) {
    //     this.router.navigateByUrl('/home');
    //     return;
    //   }
    //   this.movie = movie;
    // });
    this.checkLoginState();
    if(!this.edit && this.isLoggedIn) this.displayToast();
    this.movie = this.activatedRoute.snapshot.params;
  }

  onRatingChange(rating: number, movie: Movie){    
    this.favouritesService.updateRating(rating, movie)
      .subscribe( res => {          
        this.alertsService.alertModal(`Your rate ${movie.title} with ${res.fav.vote_average}`, 'success')
      }, (err) => {
        this.alertsService.alertToast('Something went wrong', 'error');
      });
  }

  displayToast() {
    this.toastController.create({      
      message: 'To edit, add the movie to favourites!',
      position: 'bottom',
      duration: 5000,      
      cssClass: 'toast-custom-class',
      buttons: [
        {
          side: 'end',
          text: 'Close',
          role: 'cancel',
        }
      ]
    })
    .then((toast) => {
      this.toastPresent = true;
      toast.present()
      toast.onDidDismiss().then(() => this.toastPresent = false)
    });
  }

  onBack() {
    if(this.toastPresent) this.toastController.dismiss();    
    this.location.back();
  }

  addFavourite( movie: Movie ) {
    const fav = {
      title: movie.title,
      overview: movie.overview,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      backdrop_path: movie.backdrop_path
    }

    this.favouritesService.addFavourite(fav)
      .subscribe( res => {          
        this.alertsService.alertToast(res.msg, 'success');
      }, (err) => {
        this.alertsService.alertToast('Something went wrong', 'error');
      }); 
  }

  async editFavourite( movie: Movie ) {   
    
    const modal = await this.modalController.create({
      component: FormModalPage,
      // cssClass: 'my-custom-class',
      componentProps: {
        'id'          : movie._id,
        'title'       : movie.title,
        'overview'    : movie.overview,
        'release_date': movie.release_date
      }
    });
    
    modal.onDidDismiss().then((movieUpdated) => {
      if(movieUpdated.data) {
        this.movie = {
          ...this.movie,
          title: movieUpdated.data.title,
          overview: movieUpdated.data.overview,
          release_date: movieUpdated.data.release_date
        }
      }
    });

    await modal.present();
  }

  deleteFav( movie: Movie ) {      
    this.favouritesService.deleteFavourite(movie);    
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