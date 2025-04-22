import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { StudentModule } from './student/student.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Global()
@Module({
  imports: [AuthenticationModule],
  exports: [AuthenticationModule],
})
class GlobalModule {}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    GlobalModule,
    StudentModule,
  ],
})
export class AppModule {}
