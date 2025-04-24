import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginObject {
  @Field()
  accessToken: string;
  @Field()
  refreshToken: string;
}
