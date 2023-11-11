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
import { CreateBookCategoryDto, UpdateBookCategoryDto } from './category.dto';
import { AuthGuard } from '../auth/auth.guard';
@UseGuards(AuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async getCategories(@Query('limit') take = 10, @Query('offset') skip = 0) {
    return this.prisma.bookCategory.findMany({
      take,
      skip,
      include: { books: true },
    });
  }
  @Get(':id')
  async getCategory(@Param('id') id: string) {
    return this.prisma.bookCategory.findUnique({
      where: { id },
      include: { books: true },
    });
  }
  @Post()
  async createBookCategory(@Body() body: CreateBookCategoryDto) {
    return this.prisma.bookCategory.create({ data: { title: body.title } });
  }
  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.prisma.bookCategory.delete({ where: { id } });
  }
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateBookCategoryDto,
  ) {
    return this.prisma.bookCategory.update({
      where: { id },
      data: { title: body.title },
      include: { books: true },
    });
  }
}
