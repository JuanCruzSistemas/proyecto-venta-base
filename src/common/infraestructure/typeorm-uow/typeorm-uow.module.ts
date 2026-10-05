import { Global, Module } from "@nestjs/common";
import { GestorEntityManager } from "./gestor-entity-manager";
import { UNIT_OF_WORK_TOKEN } from "../../application/unit-of-work/unit-of-work.interface";
import { TypeOrmUnitOfWork } from "./typeorm-uow.implementation";

@Global()
@Module({
    providers: [
        GestorEntityManager,
        {
            provide: UNIT_OF_WORK_TOKEN,
            useClass: TypeOrmUnitOfWork
        }
    ],
    exports: [
        UNIT_OF_WORK_TOKEN,
        GestorEntityManager
    ]
})
export class TypeOrmUnitOfWorkModule {}