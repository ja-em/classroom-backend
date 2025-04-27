import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'prisma/prisma.service';
import {
  CreateStudentInput,
  GetAllStudentInput,
  UpdateStudentInput,
} from 'types/input';

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
      throw new GraphQLError(`Student with ID ${id} not found`);
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
          id: 'desc',
        },
        include: {
          classLevel: true,
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

  async getClassLevel() {
    const find = await this._prismaService.classLevel.findMany();
    return find;
  }

  async create(args: CreateStudentInput) {
    const data = await this._prismaService.student.create({
      data: args,
    });
    return data;
  }

  async delete(id: number) {
    await this.getById(id);
    await this._prismaService.student.delete({
      where: { id },
    });

    return 'OK';
  }

  async update(id: number, args: UpdateStudentInput) {
    const find = await this.getById(id);
    const data = await this._prismaService.student.update({
      where: {
        id: find.id,
      },
      data: args,
    });
    return data;
  }
}
