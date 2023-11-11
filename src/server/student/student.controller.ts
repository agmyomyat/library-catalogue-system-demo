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
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('students')
export class StudentController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async getStudents(@Query('limit') take = 10, @Query('offset') skip = 0) {
    return this.prisma.student.findMany({
      take,
      skip,
      include: { borrowRecord: true },
    });
  }
  @Get('search')
  async searchStudents(
    @Query('limit') take = 10,
    @Query('offset') skip = 0,
    @Query('email') email: string,
    @Query('name') name: string,
  ) {
    const where: Record<string, any> = {};

    if (email) {
      where.email = {
        contains: email,
      };
    }

    if (name) {
      where.name = {
        contains: name,
      };
    }

    return this.prisma.student.findMany({
      take,
      skip,
      where,
      include: { borrowRecord: true },
    });
  }

  @Get(':id')
  async getStudent(@Param('id') id: string) {
    return this.prisma.student.findUnique({
      where: { id },
      include: { borrowRecord: true },
    });
  }
  @Post()
  async createStudent(@Body() body: CreateStudentDto) {
    return this.prisma.student.create({ data: { ...body } });
  }
  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    return this.prisma.student.delete({ where: { id } });
  }
  /**
   * 
   * @param body 
   * {
  name?: string;
  email?: string;
  phone?: string;
}
   */
  @Patch(':id')
  async updateStudent(@Param('id') id: string, @Body() body: UpdateStudentDto) {
    return this.prisma.student.update({
      where: { id },
      data: { ...body },
      include: { borrowRecord: true },
    });
  }
}
