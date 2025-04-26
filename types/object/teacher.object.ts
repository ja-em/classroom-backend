import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Teacher } from '@prisma/client';

@ObjectType()
export class TeacherObject implements Teacher {
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
