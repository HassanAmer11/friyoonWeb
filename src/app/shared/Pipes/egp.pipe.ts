import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eGP'
})
export class EGPPipe implements PipeTransform {

  transform(price: any): string {
    return 'جنية' + price;
  }

}
