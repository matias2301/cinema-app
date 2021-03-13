import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FavouritesService } from '../../services/favourites.service';

import { FavResponse } from '../../interfaces/favourite';
import { FormModalPage } from '../../modals/form-modal/form-modal.page';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  movies: FavResponse[] = [];
  loading: boolean = false;
  term: String = '';
  
  constructor (                
                private favouritesService: FavouritesService,
                private activatedRoute: ActivatedRoute,                
                public modalController: ModalController,                       
              ) {
                this.activatedRoute.params.subscribe( () => {                  
                  this.loadFavourites();                  
                })
              }

  ngOnInit() {         
  }

  loadFavourites() {
    this.loading = true;
    this.favouritesService.getFavourites()
    .subscribe( favs => {
      this.movies = favs.favourites;
      this.loading = false;      
    });
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
