import { Global, Module } from "@nestjs/common";

import { PrismaService } from "./prisma.service";
import { GestorPrismaClient } from "./gestor-prisma-client";
import { PrismaUnitOfWork } from "./prisma-uow.implementation";
import { UNIT_OF_WORK_TOKEN } from "../../application/unit-of-work/unit-of-work.interface";

@Global()
@Module({
    providers: [
        PrismaService,
        GestorPrismaClient,
        {
            provide: UNIT_OF_WORK_TOKEN,
            useClass: PrismaUnitOfWork
        }
    ],
    exports: [
        UNIT_OF_WORK_TOKEN,
        GestorPrismaClient,
        PrismaService
    ]
})
export class PrismaUnitOfWorkModule {}
