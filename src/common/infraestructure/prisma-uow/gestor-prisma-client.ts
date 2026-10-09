import { AsyncLocalStorage } from "node:async_hooks";
import { PrismaService } from "./prisma.service";
import { Prisma } from "../../../generated/prisma";

const transactionStore = new AsyncLocalStorage<Prisma.TransactionClient>();

export class GestorPrismaClient {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async runInTransaction<T>(work: () => Promise<T>): Promise<T> {
        if (this.inActualTransaction) {
            return work();
        }

        return this.prisma.$transaction(async (tx) => transactionStore.run(tx, work));
    }

    get actual(): Prisma.TransactionClient | PrismaService {
        return transactionStore.getStore() ?? this.prisma;
    }

    get inActualTransaction(): boolean {
        return transactionStore.getStore() !== undefined;
    }
}