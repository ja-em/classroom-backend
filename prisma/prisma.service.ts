import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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
}
