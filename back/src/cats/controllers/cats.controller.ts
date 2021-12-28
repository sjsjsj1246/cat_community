import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/successInterceptor';
import { Cat } from '../cats.schema';
import { CatsService } from '../services/cats.service';
import { ReadOnlyCatDto } from '../dto/cats.dto';
import { CatRequestDto } from '../dto/cats.request.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '모든 고양이 가져오기' })
  @Get('all')
  getAllCat() {
    return this.catsService.getAllCat();
  }

  @ApiOperation({ summary: '현재 고객의 데이터 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: Cat) {
    return cat.readOnlyData;
  }

  @ApiResponse({ status: 500, description: 'Server Error...' })
  @ApiResponse({ status: 200, description: 'Success!', type: ReadOnlyCatDto })
  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  async signup(@Body() body: CatRequestDto) {
    return await this.catsService.signup(body);
  }

  @ApiResponse({ status: 500, description: 'Server Error...' })
  @ApiResponse({ status: 200, description: 'Success!', type: ReadOnlyCatDto })
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() body: any) {
    return this.authService.jwtLogIn(body);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logout() {
    return 'logout';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  async uploadCatImg(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() cat: Cat,
  ) {
    return await this.catsService.uploadImg(cat, file);
  }
}
