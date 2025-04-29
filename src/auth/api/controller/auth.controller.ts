import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'package/guards/local-auth-guard';
import { AuthService } from 'src/auth/service/auth.service';
import { LoginDto } from '../dto';
import { AuthValidation } from '../validation';
import { User } from 'package/decorator/param/user.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authValidation: AuthValidation,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard) // checked if the user does exist in our database
  async login(
    @Body() body: LoginDto,
    @User() user,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.authService.login(body, user);
    response.cookie('accessToken', data.accessToken);
    delete data.accessToken;
    return user;
  }

  @Get('/csrf-token')
  getCsrfToken(@Req() req): { csrfToken: string } {
    return { csrfToken: req.csrfToken() };
  }
}
