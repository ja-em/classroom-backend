import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { StudentObject } from './student.object';
import { ClassroomObject } from './classroom.object';

@ObjectType()
export class EnrollmentObject
  implements
    Prisma.EnrollmentGetPayload<{
      include: { student: true; classroom: true };
    }>
{
  @Field(() => Number)
  id: number;
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
  @Field(() => Number)
  classroomId: number;
  @Field(() => Number)
  studentId: number;
  @Field(() => StudentObject)
  student: StudentObject;
  @Field(() => ClassroomObject)
  classroom: ClassroomObject;
}
