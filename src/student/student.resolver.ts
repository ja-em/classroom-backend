import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Parent } from '@nestjs/graphql';
import { AuthGuard } from 'guards/auth.guard';
import { StudentObject, StudentPaginationObject } from 'types/object';
import { StudentService } from './studen.service';
import { GetAllStudentInput } from 'types/input';

@UseGuards(AuthGuard) // Apply the AuthGuard to this resolver
@Resolver(() => StudentObject)
export class StudentResover {
  constructor(private readonly _studentService: StudentService) {}

  @Query(() => StudentObject)
  getStudentById(@Args('id') id: number) {
    return this._studentService.getById(id);
  }

  @Query(() => StudentPaginationObject)
  getStudent(@Args('input', { nullable: true }) args?: GetAllStudentInput) {
    return this._studentService.getAll(args);
  }
}
