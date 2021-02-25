import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll, IonVirtualScroll, ModalController } from '@ionic/angular';
import { IonItemSliding } from '@ionic/angular';

import { FavouritesService } from '../../services/favourites.service';

import { Movie } from '../../interfaces/movie-response';
import { FavResponse } from '../../interfaces/favourite';

import { FormModalPage } from '../../modals/form-modal/form-modal.page';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  movies: FavResponse[] = [];
  spinner: boolean = false;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  
  constructor (                
                private favouritesService: FavouritesService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                public modalController: ModalController            
              ) {
                this.activatedRoute.params.subscribe( () => {                  
                  this.loadFavourites();                  
                })
              }

  ngOnInit() {         
  }

  loadData(event) {
  }

  loadFavourites() {
    this.spinner = true;
    this.favouritesService.getFavourites()
    .subscribe( favs => {
      this.movies = favs.favourites;
      this.spinner = false;      
    });
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
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

  async addFavourite() {
    const modal = await this.modalController.create({
      component: FormModalPage,
      // cssClass: 'my-custom-class',
      componentProps: {
        add: true,
      }
    });
      
    modal.onDidDismiss().then((newMovie) => {
      if(newMovie.data) {                           
        this.movies.push(newMovie.data);        
      }
    });

    await modal.present();
  }
  
}
