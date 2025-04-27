import { UseGuards } from '@nestjs/common';
import { Query, Args, Mutation, Int } from '@nestjs/graphql';
import { AuthGuard } from 'guards/auth.guard';
import {
  ClassLevelObject,
  StudentObject,
  StudentPaginationObject,
} from 'types/object';
import { StudentService } from './studen.service';
import {
  CreateStudentInput,
  GetAllStudentInput,
  UpdateStudentInput,
} from 'types/input';

@UseGuards(AuthGuard)
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

  @Query(() => [ClassLevelObject])
  getClassLevel() {
    return this._studentService.getClassLevel();
  }

  @Mutation(() => StudentObject)
  createStudent(@Args('input') args: CreateStudentInput) {
    return this._studentService.create(args);
  }

  @Mutation(() => String)
  deleteStudent(
    @Args({ name: 'studentId', type: () => Int }) studentId: number,
  ) {
    return this._studentService.delete(studentId);
  }

  @Mutation(() => StudentObject)
  updateStudent(
    @Args({ name: 'studentId', type: () => Int }) studentId: number,
    @Args('input') input: UpdateStudentInput,
  ) {
    return this._studentService.update(studentId, input);
  }
}
