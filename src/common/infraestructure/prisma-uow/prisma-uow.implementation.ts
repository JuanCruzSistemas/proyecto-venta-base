import { IUnitOfWork } from "../../application/unit-of-work/unit-of-work.interface";
import { GestorPrismaClient } from "./gestor-prisma-client";

export class PrismaUnitOfWork implements IUnitOfWork {
    constructor(
        private readonly gestor: GestorPrismaClient
    ) {}

    async runInTransaction<T>(work: () => Promise<T>): Promise<T> {
        return this.gestor.runInTransaction(work);
    }
}
