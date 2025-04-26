import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TeacherService {
  constructor(private readonly _prismaService: PrismaService) {}

  async getAll() {
    const find = await this._prismaService.teacher.findMany();
    return find;
  }

  async getHomeroom(teacherId: number) {
    return this._prismaService.homeroomTeacher.findMany({
      where: { id: teacherId },
    });
  }
}
