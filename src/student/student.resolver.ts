import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { AuthGuard } from 'guard/auth.guard';

@UseGuards(AuthGuard) // Apply the AuthGuard to this resolver
@Resolver(() => String)
export class StudentResover {
  // Define your resolver methods here
  // For example, a simple query that returns a string
  @Query(() => String)
  getStudent2() {
    return 'Hello, Student!2';
  }
}
