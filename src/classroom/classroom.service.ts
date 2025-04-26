import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { GetClassroomInput } from 'types/input';

@Injectable()
export class ClassroomService {
  constructor(private readonly _prismaService: PrismaService) {}

  async getAll(input: GetClassroomInput) {
    const find = await this._prismaService.classroom.findMany({});
    return this._prismaService.toPaginationResponse(find, {
      ...input,
      totalItem: find.length,
    });
  }

  //   async create(){
  //     const data:Prisma.ClassroomUncheckedCreateInput = {
  //         roomNumber: '',
  //         roomName: '',
  //         academicYear: ''
  //     }
  //     await this._prismaService.classroom.create({
  //         data:{

  //         }
  //     })
  //   }
}
