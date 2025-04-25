import { Field, GraphQLISODateTime } from '@nestjs/graphql';
import { ClassLevel } from 'prisma/client';

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
