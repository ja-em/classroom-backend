import { Field, InputType } from '@nestjs/graphql';
import { PaginationInput } from './pagination.input';

@InputType()
export class GetClassroomInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  keyword?: string;
  @Field(() => Number, { nullable: true })
  teacherId?: number;
}
