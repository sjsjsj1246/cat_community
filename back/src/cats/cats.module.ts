import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './controllers/cats.controller';
import { Cat, _CatSchema } from './cats.schema';
import { CatsService } from './services/cats.service';
import { CatsRepository } from './cats.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { Comment, CommentsSchema } from 'src/comments/comments.schema';
import { AwsService } from './services/aws.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cat.name, schema: _CatSchema },
      { name: Comment.name, schema: CommentsSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository, AwsService],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
