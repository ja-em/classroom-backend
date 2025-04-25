import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { StudentModule } from './student/student.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';

@Global()
@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
  ],
  exports: [AuthenticationModule, PrismaModule],
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
