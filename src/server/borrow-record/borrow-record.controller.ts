import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBorrowRecordDto } from './borrow-record.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('borrow-records')
export class BorrowRecordController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async getBorrowRecords(@Query('limit') take = 10, @Query('offset') skip = 0) {
    return this.prisma.borrowRecord.findMany({ take, skip });
  }
  @Get(':id')
  async getBorrowRecord(@Param('id') id: string) {
    return this.prisma.borrowRecord.findUnique({ where: { id } });
  }
  @Post()
  async createBorrowRecord(@Body() body: CreateBorrowRecordDto) {
    return this.prisma.borrowRecord.create({
      data: {
        book: { connect: { id: body.bookId } },
        startDate: body.borrowDate,
        endDate: body.returnDate,
        student: { connect: { id: body.studentId } },
      },
    });
  }
  @Delete(':id')
  async deleteBorrowRecord(@Param('id') id: string) {
    return this.prisma.borrowRecord.delete({ where: { id } });
  }
}
