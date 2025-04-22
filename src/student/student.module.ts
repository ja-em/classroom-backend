import { Module } from '@nestjs/common';
import { StudentResover } from './student.resolver';

@Module({ providers: [StudentResover] })
export class StudentModule {}
