import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ClassLevel } from '@prisma/client';

@ObjectType()
export class ClassLevelObject implements ClassLevel {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => GraphQLISODateTime)
  createdAt: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
