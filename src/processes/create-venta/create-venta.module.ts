import { Module } from "@nestjs/common";
import { VentasModule } from "../../modules/ventas/ventas.module";
import { CreateVentaUseCase } from "./application/use-cases/create-venta.use-case";
import { CreateVentaFacade } from "./application/facades/create-venta.facade";
import { ProductosModule } from "../../modules/productos/productos.module";
import { VentasController } from "../../modules/ventas/infraestructure/presentation/controllers/ventas.controller";

@Module({
    imports: [
        VentasModule,
        ProductosModule
    ],
    controllers: [
        VentasController
    ],
    providers: [
        CreateVentaUseCase,
        CreateVentaFacade
    ]
})
export class CreateVentaModule {}