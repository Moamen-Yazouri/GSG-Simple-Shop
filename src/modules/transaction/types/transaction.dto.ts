import { Prisma } from "generated/prisma";

export type TransactionResponseDTO = Prisma.UserTransactionGetPayload<{
    include: {
        order: {
            include: {
                orderProducts: true,
            }
        },
        orderReturn: true,
    }
}>;
