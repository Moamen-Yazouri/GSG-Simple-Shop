import { Injectable } from '@nestjs/common';
import { UserRole } from 'generated/prisma';
import type { PaginatedResult, PaginationQueryType } from 'src/types/util.types';
import { DatabaseService } from '../database/database.service';
import { removeFields } from 'src/utils/object.util';
import { TransactionResponseDTO } from './types/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prismaService: DatabaseService){}

  async findAll(query: PaginationQueryType, id: string): Promise<PaginatedResult<TransactionResponseDTO>> {
    return await this.prismaService.$transaction(async(tx) => {
      const pagination = this.prismaService.handleQueryPagination(query);
      const orderBy = this.prismaService.handleSortByQuery(query);

      const transactions = await tx.userTransaction.findMany({
        where: {
          userId: BigInt(id),
        },
        orderBy,
        ...removeFields(pagination, ['page']),
        include: {
          order: {
            include: {
              orderProducts: true
            }
          },
          orderReturn: true
        }
      });

      const count = await tx.userTransaction.count();
      return {
        data: transactions,
        ...this.prismaService.formatPaginationResponse({
          page: pagination.page,
          count,
          limit: pagination.take,
        }),
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

}
