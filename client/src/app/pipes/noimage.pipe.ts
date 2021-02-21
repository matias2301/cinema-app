import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(image: string): string {
    if ( image ) {
      return `https://image.tmdb.org/t/p/w500${ image }`;
    } else {
      return './assets/no-image.jpg';
    }
  }
}
