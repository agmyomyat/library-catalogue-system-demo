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
import { CreateBookDto, UpdateBookDto } from './book.dto';
import { nanoid } from 'nanoid';
import { AuthGuard } from '../auth/auth.guard';
@UseGuards(AuthGuard)
@Controller('books')
export class BookController {
  constructor(private prisma: PrismaService) {}
  // Get books with pagination
  // default items return is 10
  @Get()
  async getBooks(
    @Query('limit') take = 10,
    @Query('offset') skip = 0,
    @Query('author_id') author_id: string,
    @Query('category_ids') category_ids: string[] = [],
    @Query('catalogue_id') catalogue_id: string,
  ) {
    const where: Record<string, any> = {};

    if (author_id) {
      where.author_id = author_id;
    }

    if (category_ids) {
      where.categories = {
        every: {
          id: {
            in: category_ids,
          },
        },
      };
    }

    if (catalogue_id) {
      where.catalogId = catalogue_id;
    }

    return this.prisma.book.findMany({
      take,
      skip,
      where,
      include: { categories: true },
    });
  }

  @Get()
  async getBook(@Param('id') id: string) {
    return this.prisma.book.findUnique({
      where: { id },
      include: { categories: true },
    });
  }
  /**@param body  
   * title: string;
  categoryIds: string[];
  authorId: string; */
  @Post()
  async createBook(@Body() body: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        title: body.title,
        categories: {
          create: body.categoryIds?.map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
        author: { connect: { id: body.authorId } },
        catalogId: nanoid(),
      },
    });
  }
  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.prisma.book.delete({ where: { id } });
  }
  /**
   * 
   * @param body 
   * title?: string;
  categoryIdsToUpdate?: string[];
  categoryIdsToDelete?: string[];
  authorId?: string;
   */
  @Patch(':id')
  async updateBook(@Param('id') id: string, @Body() body: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data: {
        title: body.title,
        categories: {
          create: body.categoryIdsToUpdate?.map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),

          deleteMany: {
            categoryId: {
              in: body.categoryIdsToDelete,
            },
          },
        },
      },
    });
  }
}
