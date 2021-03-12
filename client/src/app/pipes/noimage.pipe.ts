import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(image: string): string {

    if ( image == 'null') return './assets/no-image.jpg';
    
    if ( image ) {
      if(image.split('/')[0] === 'assets') {
        return image;
      } else {
        return `https://image.tmdb.org/t/p/w500${ image }`;
      }
    } else {
      return './assets/no-image.jpg';
    }
  }
}
