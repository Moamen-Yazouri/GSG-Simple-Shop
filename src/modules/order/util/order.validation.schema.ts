import z, { ZodType } from 'zod';
import { CreateOrderDTO, CreateOrderReturnDTO, UpdateOrderStatusDTO, UpdateReturnDTO } from '../types/order.dto';
import { OrderStatus } from 'generated/prisma';

export const createOrderDTOValidationSchema = z.array(
  z.object({
    productId: z.number().min(1),
    qty: z.number().min(1),
  }),
) satisfies ZodType<CreateOrderDTO>;

export const createReturnDTOValidationSchema = z.object({
  orderId: z.number().min(1),
  items: z.array(
    z.object({
      productId: z.number().min(1),
      qty: z.number().min(1),
    }),
  ),
}) satisfies ZodType<CreateOrderReturnDTO>;



export const updateReturnValidationSchema = z.object({
  userId: z.number().min(1),
  returnId: z.number().min(1),
}) satisfies ZodType<UpdateReturnDTO>;