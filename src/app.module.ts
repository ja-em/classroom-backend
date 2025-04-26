import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { StudentModule } from './student/student.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { ClassroomModule } from './classroom/classroom.module';
import { TeacherModule } from './teacher/teacher.module';
import { ErrorExceptionFilter } from 'filters/error.filter';

@Global()
@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ClassroomModule,
    TeacherModule,
  ],
  exports: [AuthenticationModule, PrismaModule],
})
class GlobalModule {}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
      formatError: (formattedError, error) => {
        const { path } = formattedError;
        return {
          ...ErrorExceptionFilter.toErrorResponse(error),
          path,
        };
      },
    }),
    GlobalModule,
    StudentModule,
  ],
})
export class AppModule {}
