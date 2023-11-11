import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';
import { AuthGuard } from '../auth/auth.guard';
@UseGuards(AuthGuard)
@Controller('authors')
export class AuthorController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async getAuthors(@Query('limit') take = 10, @Query('offset') skip = 0) {
    return this.prisma.author.findMany({
      take,
      skip,
      include: { books: true },
    });
  }
  @Get(':id')
  async getAuthor(@Param('id') id: string) {
    return this.prisma.author.findUnique({
      where: { id },
      include: { books: true },
    });
  }
  @Post()
  async createAuthor(@Body() body: CreateAuthorDto) {
    return this.prisma.author.create({ data: { name: body.name } });
  }
  @Delete(':id')
  async deleteAuthor(@Param('id') id: string) {
    return this.prisma.author.delete({ where: { id } });
  }
  @Patch(':id')
  async updateAuthor(@Param('id') id: string, @Body() body: UpdateAuthorDto) {
    return this.prisma.author.update({
      where: { id },
      data: { name: body.name },
    });
  }
}
