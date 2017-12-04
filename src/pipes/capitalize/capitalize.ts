import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, onlyFirst: boolean) {
    // return value.toLowerCase();

    if (onlyFirst) {
      return value.charAt(0).toUpperCase()+ value.substr(1);
    }
    
    let words: string[] = value.split(' ');
    let final: string = '';

    words.forEach((value: string, index: number, words: string[]) => {
      final += value.charAt(0).toUpperCase() + value.substr(1).toLowerCase()+ ' ';
    })
    return final;
  }
}
