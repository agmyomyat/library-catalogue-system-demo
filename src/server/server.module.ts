import { Module } from '@nestjs/common';

import { AppModule } from 'src/server/app/app.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { StudentModule } from './student/student.module';
import { BorrowRecordModule } from './borrow-record/borrow-record.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppModule,
    BookModule,
    PrismaModule,
    PrismaModule,
    AuthorModule,
    CategoryModule,
    StudentModule,
    BorrowRecordModule,
    AuthModule,
  ],
})
export class ServerModule {}
