import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {
  AUTH_SERVER_ADDRESS: string = 'http://localhost:4000'; 
  // AUTH_SERVER_ADDRESS: string = 'https://lit-forest-87722.herokuapp.com';

  transform(image: string): string {    

    if ( image == 'null') return './assets/no-image.jpg';
    
    if ( image ) {
      if(image[0] !== '/') {
        return  `${this.AUTH_SERVER_ADDRESS}/api/images/${ image }`;
      } else {
        return `https://image.tmdb.org/t/p/w500${ image }`;
      }
    } else {
      return './assets/no-image.jpg';
    }
  }
}