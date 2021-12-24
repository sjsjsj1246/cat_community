import { HttpException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PositiveInt implements PipeTransform {
  transform(value: number) {
    if (value < 0) {
      throw new HttpException('value < 0', 400);
    }
    return value;
  }
}
