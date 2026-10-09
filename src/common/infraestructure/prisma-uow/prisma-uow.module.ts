import { Global, Module } from "@nestjs/common";

import { PrismaService } from "./prisma.service";
import { GestorPrismaClient } from "./gestor-prisma-client";
import { PrismaUnitOfWork } from "./prisma-uow.implementation";

export const PRISMA_UNIT_OF_WORK_TOKEN = Symbol('IUnitOfWork:Prisma');

@Global()
@Module({
    providers: [
        PrismaService,
        GestorPrismaClient,
        {
            provide: PRISMA_UNIT_OF_WORK_TOKEN,
            useClass: PrismaUnitOfWork
        }
    ],
    exports: [
        PRISMA_UNIT_OF_WORK_TOKEN,
        GestorPrismaClient,
        PrismaService
    ]
})
export class PrismaUnitOfWorkModule {}
