import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TeacherService } from './teacher.service';
import { HomeroomTeacherObject, TeacherObject } from 'types/object';

@Resolver(() => TeacherObject)
export class TeacherResolver {
  constructor(private readonly _teacherService: TeacherService) {}

  @Query(() => [TeacherObject])
  getTeacher() {
    return this._teacherService.getAll();
  }

  @ResolveField(() => [HomeroomTeacherObject])
  homerooms(@Parent() parent: TeacherObject) {
    return this._teacherService.getHomeroom(parent.id);
  }
}
