import { Pipe, PipeTransform } from '@angular/core';
import { IGovernorates } from '../Interfaces/igovernorates';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(governorates: IGovernorates [], trimText:string): IGovernorates[] {
    return governorates.filter(gov => gov.nameAr.includes(trimText));
  }

}
