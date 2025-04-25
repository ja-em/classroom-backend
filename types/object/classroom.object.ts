import { Prisma } from '@prisma/client';
import { HomeroomTeacherObject } from './homeroom-teacher.object';
import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { EnrollmentObject } from './enrollment.object';

@ObjectType()
export class ClassroomObject
  implements
    Prisma.ClassroomGetPayload<{
      include: { enrollments: true; homeroomTeachers: true };
    }>
{
  @Field(() => Number)
  id: number;
  @Field(() => String)
  roomNumber: string;
  @Field(() => String)
  roomName: string;
  @Field(() => String)
  academicYear: string;
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
  @Field(() => [EnrollmentObject])
  enrollments: EnrollmentObject[];
  @Field(() => [HomeroomTeacherObject])
  homeroomTeachers: HomeroomTeacherObject[];
}
