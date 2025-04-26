import { Resolver } from '@nestjs/graphql';
import { ClassroomService } from './classroom.service';

@Resolver()
export class ClassroomResolver {
  constructor(private readonly classroomService: ClassroomService) {}
}
