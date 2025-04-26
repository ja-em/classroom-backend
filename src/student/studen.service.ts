import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { GetAllStudentInput } from 'types/input';

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

  async getAll(args?: GetAllStudentInput) {
    const keyword = args?.keyword;
    const whereKeyword: Prisma.StudentWhereInput = {
      OR: [
        {
          identificationNumber: {
            contains: keyword,
          },
        },
        {
          firstName: {
            contains: keyword,
          },
        },
        {
          lastName: {
            contains: keyword,
          },
        },
      ],
    };
    const allWhere: Prisma.StudentWhereInput = {
      ...(keyword && whereKeyword),
      ...(args?.classLevelId && {
        classLevelId: args.classLevelId,
      }),
    };
    const [find, count] = await Promise.all([
      this._prismaService.student.findMany({
        where: allWhere,
        skip: this._prismaService.getSkip(args?.page, args?.limit),
        take: this._prismaService.getLimit(args?.limit),
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this._prismaService.student.count({
        where: allWhere,
      }),
    ]);
    return this._prismaService.toPaginationResponse(find, {
      ...args,
      totalItem: count,
    });
  }
}
