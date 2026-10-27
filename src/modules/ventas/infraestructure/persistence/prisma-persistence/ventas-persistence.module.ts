import { Module } from "@nestjs/common";

import { VENTAS_PERSISTENCE_PORT } from "../../../domain/ports/ventas-persistence.port";

import { VentasRepository } from "./repositories/ventas.repository";

@Module({
    providers: [
        {
            provide: VENTAS_PERSISTENCE_PORT,
            useClass: VentasRepository
        }
    ],
    exports: [
        VENTAS_PERSISTENCE_PORT
    ]
})
export class VentasPersistenceModule {}
