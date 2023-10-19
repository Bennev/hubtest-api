import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { dataSource } from './shared/data-source';

@Injectable()
export class TypeOrmService implements OnModuleInit {
  private readonly logger = new Logger(TypeOrmService.name);

  onModuleInit() {
    dataSource
      .initialize()
      .then(() => {
        this.logger.debug('Connection database started');
      })
      .catch(() => {
        this.logger.error('Connection database error');
      });
  }
}
