import { Module } from '@nestjs/common';
import { StudentResover } from './student.resolver';
import { StudentService } from './studen.service';

@Module({ providers: [StudentResover, StudentService] })
export class StudentModule {}
