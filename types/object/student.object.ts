import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassLevelObject } from './class-level.object';
import { EnrollmentObject } from './enrollment.object';
import { PaginatedResponse } from './pagination.object';

@ObjectType()
export class StudentObject
  implements
    Prisma.StudentGetPayload<{
      include: { classLevel: true; enrollment: true };
    }>
{
  @Field(() => String)
  identificationNumber: string;
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

@ObjectType()
export class StudentPaginationObject extends PaginatedResponse(StudentObject) {}
