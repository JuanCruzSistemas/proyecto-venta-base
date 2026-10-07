import { Module } from "@nestjs/common";
import { VentasPersistenceModule } from "./infraestructure/persistence/typeorm-persistence/ventas-persistence.module";
import { FindAllVentasUseCase } from "./application/use-cases/find-all-ventas.use-case";
import { FindOneVentaUseCase } from "./application/use-cases/find-one.use-case";
import { VentasFacade } from "./application/facades/ventas.facade";

@Module({
    imports: [
        VentasPersistenceModule
    ],
    providers: [
        FindAllVentasUseCase,
        FindOneVentaUseCase,
        VentasFacade
    ],
    exports: [
        VentasPersistenceModule,
        VentasFacade
    ]
})
export class VentasModule {}