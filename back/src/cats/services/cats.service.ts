import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from '../cats.schema';
import { CatRequestDto } from '../dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from '../cats.repository';
import { AwsService } from './aws.service';

@Injectable()
export class CatsService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly awsService: AwsService,
  ) {}

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }

  async signup(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.exists(email);

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }

  async uploadImg(cat: Cat, file: Express.Multer.File) {
    console.log(file);
    const result = await this.awsService.uploadFileToS3('cats', file);
    console.log('성공');
    console.log(result);
    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      this.awsService.getAwsS3FileUrl(result.key),
    );
    return newCat.readOnlyData;
  }
}
