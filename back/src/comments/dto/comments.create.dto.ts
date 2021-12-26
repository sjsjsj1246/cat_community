import { PickType } from '@nestjs/swagger';
import { Comment } from '../comments.schema';

export class CommentsCreateDto extends PickType(Comment, [
  'contents',
  'info',
] as const) {}
