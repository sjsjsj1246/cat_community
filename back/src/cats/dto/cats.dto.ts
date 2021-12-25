import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, [
  'email',
  'name',
  'imgUrl',
] as const) {
  @ApiProperty({ example: '$aweczqowe', description: '아이디' })
  id: string;
}
