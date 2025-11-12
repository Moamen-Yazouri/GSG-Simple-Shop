import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { request } from 'express';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { paginationSchema } from 'src/utils/api.util';
import type { PaginationQueryType } from 'src/types/util.types';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

 
  @Get()
  findAll(
    @Req() request: Express.Request,
    @Query(new ZodValidationPipe(paginationSchema))
    query: PaginationQueryType,
  ) {
    return this.transactionService.findAll(query, request.user!.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

}
