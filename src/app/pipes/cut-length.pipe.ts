import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutLength'
})
export class CutLengthPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';
    if (value.length > 100) {
      return value.substring(0, 100) + '...';
    }
    return value;
  }
}