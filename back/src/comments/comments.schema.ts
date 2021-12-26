import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
  collection: 'comments',
  timestamps: true,
};

@Schema(options)
export class Comment extends Document {
  @ApiProperty({ description: '작성 대상', required: true })
  @Prop({ type: Types.ObjectId, required: true, ref: 'cats' })
  @IsNotEmpty()
  info: Types.ObjectId;

  @ApiProperty({ description: '작성자', required: true })
  @Prop({ type: Types.ObjectId, required: true, ref: 'cats' })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({ description: '내용', required: true })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({ description: '좋아요 수', required: true })
  @Prop({ default: 0, required: true })
  @IsNotEmpty()
  @IsPositive()
  likeCount: number;
}

export const CommentsSchema = SchemaFactory.createForClass(Comment);
