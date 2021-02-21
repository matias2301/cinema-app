import { Component, ViewChild, OnInit } from '@angular/core';
import * as faker from 'faker';

import { IonInfiniteScroll, IonVirtualScroll } from '@ionic/angular';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  dataList = [];

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  
  constructor() {
    this.getEmployees()
  }

  ngOnInit() {
  }

  loadData(event) {

    // Using settimeout to simulate api call 
    setTimeout(() => {

      // load more data
      this.getEmployees()

      //Hide Infinite List Loader on Complete
      event.target.complete();

      //Rerender Virtual Scroll List After Adding New Data
      this.virtualScroll.checkEnd();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataList.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  getEmployees() {
    for (let i = 0; i < 20; i++) {
      this.dataList.push({
        image: faker.image.avatar(),
        name: faker.name.firstName(),
        address: faker.address.streetAddress(),
        intro: 'Description of the avenger movie infinity war and civil war ectecera and so on'
      })
    }
  }

}
