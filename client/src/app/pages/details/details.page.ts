import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ToastController } from '@ionic/angular';

import { MoviesService } from '../../services/movies.service';
import { MovieResponse } from '../../interfaces/movie-response';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  public movie: MovieResponse;  

  constructor (
                private activatedRoute: ActivatedRoute,
                private moviesService: MoviesService,
                private location: Location,
                private router: Router,
                public toastController: ToastController
              ) { }

  ngOnInit(): void {

    const { id } = this.activatedRoute.snapshot.params;

    this.moviesService.getMovieDetail( id ).subscribe( movie => {
      if ( !movie ) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.movie = movie;
    });

    this.displayToast();
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
    }).then((toast) => {
      toast.present();
    });
  }

  onBack() {
    this.location.back();
  }

}