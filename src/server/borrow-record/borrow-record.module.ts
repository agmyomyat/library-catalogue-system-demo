import { Module } from '@nestjs/common';
import { BorrowRecordService } from './borrow-record.service';
import { BorrowRecordController } from './borrow-record.controller';

@Module({
  providers: [BorrowRecordService],
  controllers: [BorrowRecordController],
})
export class BorrowRecordModule {}
