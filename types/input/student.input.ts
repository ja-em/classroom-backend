import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { PaginationInput } from './pagination.input';

@InputType()
export class GetAllStudentInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  keyword?: string;

  @Field(() => Number, { nullable: true })
  classLevelId?: number;
}

@InputType()
export class CreateStudentInput {
  @Field(() => String)
  identificationNumber: string;
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
  @Field(() => Number)
  classLevelId: number;
}

@InputType()
export class UpdateStudentInput extends CreateStudentInput {}
