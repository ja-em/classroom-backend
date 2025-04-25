import { Field, GraphQLISODateTime } from '@nestjs/graphql';
import { Prisma } from 'prisma/client';
import { ClassLevelObject } from './class-level.object';
import { EnrollmentObject } from './enrollment.object';

export class StudentObject
  implements
    Prisma.StudentGetPayload<{
      include: { classLevel: true; enrollment: true };
    }>
{
  @Field(() => Number)
  id: number;
  @Field(() => String)
  prefix: string;
  @Field(() => String)
  firstName: string;
  @Field(() => String)
  lastName: string;
  @Field(() => String)
  gender: string;
  @Field(() => GraphQLISODateTime)
  birthDate: Date;
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
  @Field(() => Number)
  classLevelId: number;
  @Field(() => ClassLevelObject)
  classLevel: ClassLevelObject;
  @Field(() => EnrollmentObject, { nullable: true })
  enrollment: EnrollmentObject;
}
