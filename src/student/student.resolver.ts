import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Parent } from '@nestjs/graphql';
import { AuthGuard } from 'guard/auth.guard';
import { StudentObject } from 'types/object';
import { StudentService } from './studen.service';

@UseGuards(AuthGuard) // Apply the AuthGuard to this resolver
@Resolver(() => StudentObject)
export class StudentResover {
  constructor(private readonly _studentService: StudentService) {}
  // Define your resolver methods here
  // For example, a simple query that returns a string
  @Query(() => StudentObject)
  getStudentById(@Args('id') id: number) {
    return this._studentService.getById(id);
  }
}
