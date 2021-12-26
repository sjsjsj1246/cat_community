import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Cat } from 'src/cats/cats.schema';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { CommentsCreateDto } from '../dto/comments.create.dto';
import { CommentsService } from '../services/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '모든 고양이 프로필에 적힌 댓글 가져오기' })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: '댓글 쓰기' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(
    @CurrentUser() cat: Cat,
    @Body() body: CommentsCreateDto,
  ) {
    return this.commentsService.createComment(cat.id, body);
  }

  @ApiOperation({ summary: '좋아요 수 올리기' })
  @Patch(':id')
  async plusLike(@Param('id') id: string) {
    console.log(id);
    return this.commentsService.plusLike(id);
  }
}
