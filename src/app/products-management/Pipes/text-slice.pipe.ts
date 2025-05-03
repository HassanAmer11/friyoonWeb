import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textSlice'
})
export class TextSlicePipe implements PipeTransform {

  transform(title: string, sliceNum: number): string {
    return title.split(' ').slice(0, sliceNum).join(' ');
  }

}
