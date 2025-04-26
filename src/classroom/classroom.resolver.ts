import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClassroomService } from './classroom.service';
import { ClassroomObject, ClassroomPaginationObject } from 'types/object';
import { GetClassroomInput } from 'types/input';

@Resolver(() => ClassroomObject)
export class ClassroomResolver {
  constructor(private readonly _classroomService: ClassroomService) {}

  @Query(() => ClassroomPaginationObject)
  getClassroom(@Args('input', { nullable: true }) input: GetClassroomInput) {
    return this._classroomService.getAll(input);
  }
}
