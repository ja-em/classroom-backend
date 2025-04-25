import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly _prismaService: PrismaService) {}

  async getById(id: number) {
    const find = await this._prismaService.student.findUnique({
      where: {
        id: id,
      },
      include: {
        classLevel: true,
        enrollment: true,
      },
    });
    if (!find) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return find;
  }
}
