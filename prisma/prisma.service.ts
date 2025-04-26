import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaginationInput } from 'types/input';
import { IPaginationResponse } from 'types/interface';
import { PaginatedResponse } from 'types/object';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }
  private readonly _logger = new Logger(PrismaService.name);
  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this._logger.log('Prisma disconnected successfully');
    } catch (e) {
      this._logger.error(e);
    }
  }
  async onModuleInit() {
    try {
      await this.$connect();
      this._logger.log('Prisma connected successfully');
    } catch (e) {
      this._logger.error(e);
    }
  }

  getPage(page?: number) {
    return Math.max(page ?? 1, 1);
  }

  getSkip(page?: number, limit?: number) {
    const targetPage = this.getPage(page);
    return (targetPage - 1) * this.getLimit(limit);
  }

  getLimit(limit?: number) {
    return Math.max(limit ?? 10, 1);
  }

  toPaginationResponse<T>(
    items: T,
    { totalItem, page, limit }: PaginationInput & { totalItem: number },
  ): IPaginationResponse<T> {
    const targetPage = this.getPage(page);
    const targetLimit = this.getLimit(limit);
    const totalPage = Math.ceil(totalItem / targetLimit);
    return {
      totalPage,
      page: targetPage,
      limit: targetLimit,
      hasNextPage: targetPage < totalPage,
      hasPreviousPage: targetPage > 1,
      totalItem,
      items,
    };
  }
}
