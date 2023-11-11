import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService, private auth: AuthService) {}
  @Post('sign-up')
  async signup(@Body() body: SignUpDto) {
    return await this.prisma.admin.create({
      data: { username: body.userName, password: body.password },
    });
  }
  @Post('sign-in')
  async signIn(@Body() body: SignInDto) {
    const admin_info = await this.prisma.admin.findFirst({
      where: { username: body.userName, password: body.password },
    });

    // If no admin information is found, throw a ForbiddenException
    if (!admin_info) throw new ForbiddenException();

    // Check if the retrieved admin information matches the provided username and password
    if (
      admin_info.password !== body.password ||
      admin_info.username !== body.userName
    )
      throw new ForbiddenException();

    // Sign an access token using the authentication service
    const at = this.auth.signAccessToken();

    // Return the access token
    return { access_token: at };
  }
}
