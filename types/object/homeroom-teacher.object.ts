import { Prisma } from 'prisma/client';
import { ClassroomObject } from './classroom.object';
import { TeacherObject } from './teacher.object';
import { Field, GraphQLISODateTime } from '@nestjs/graphql';

export class HomeroomTeacherObject
  implements
    Prisma.HomeroomTeacherGetPayload<{
      include: { classroom: true; teacher: true };
    }>
{
  @Field(() => ClassroomObject)
  classroom: ClassroomObject;
  @Field(() => TeacherObject)
  teacher: TeacherObject;
  @Field(() => Number)
  id: number;
  @Field(() => Number)
  classroomId: number;
  @Field(() => Number)
  teacherId: number;
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
