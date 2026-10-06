import { Module } from "@nestjs/common";
import { VentasPersistenceModule } from "./infraestructure/persistence/typeorm-persistence/ventas-persistence.module";

@Module({
    imports: [
        VentasPersistenceModule
    ]
})
export class VentasModule {}