import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@ObjectType()
export class TeacherObject
  implements
    Prisma.TeacherGetPayload<{
      include: {
        homeRooms: true;
      };
    }>
{
  homeRooms: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    classroomId: number;
    teacherId: number;
  }[];
  @Field(() => Number)
  id: number;
  @Field(() => String)
  firstName: string;
  @Field(() => String)
  lastName: string;
  @Field(() => String)
  email: string;
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
