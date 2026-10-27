import { Inject, Injectable } from "@nestjs/common";
import { type VentasPersistencePort, VENTAS_PERSISTENCE_PORT } from "../../../../modules/ventas/domain/ports/ventas-persistence.port";
import { type ProductosPersistencePort, PRODUCTOS_PERSISTENCE_PORT } from "../../../../modules/productos/domain/ports/productos-persistence.port";
import { CreateVentaDto } from "../dtos/create-venta.dto";
import { VentaResponse } from "../../../../modules/ventas/application/responses/venta.response";
import { type IUnitOfWork, UNIT_OF_WORK_TOKEN } from "../../../../common/application/unit-of-work/unit-of-work.interface";
import { VentaSinDetallesException } from "../exceptions/venta-sin-detalle.exception";
import { ProductoNoEncontradoException } from "../../../../modules/productos/application/exceptions/producto-no-encontrado.exception";
import { ProductoInactivoException } from "../../../../modules/productos/application/exceptions/producto-inactivo.exception";
import { VentasFactory } from "../../../../modules/ventas/domain/factories/ventas.factory";
import { CreateDetalleInput } from "../../../../modules/ventas/domain/inputs/create-detalle.interface";
import { VentaResponseMapper } from "../../../../modules/ventas/application/mappers/venta-response.mapper";

@Injectable()
export class CreateVentaUseCase {
    constructor(
        @Inject(UNIT_OF_WORK_TOKEN)
        private readonly uow: IUnitOfWork,
        @Inject(VENTAS_PERSISTENCE_PORT)
        private readonly ventasRepo: VentasPersistencePort,
        @Inject(PRODUCTOS_PERSISTENCE_PORT)
        private readonly productosRepo: ProductosPersistencePort
    ) {}

    async execute(dto: CreateVentaDto): Promise<VentaResponse> {
        return this.uow.runInTransaction(async () => {
            if (dto.detalles.length === 0) {
                throw new VentaSinDetallesException();
            }

            const detallesConProductos: CreateDetalleInput[] = [];
            for (const detalle of dto.detalles) {
                const producto = await this.productosRepo.findOneById(detalle.productoId);
                if (!producto) {
                    throw new ProductoNoEncontradoException();
                }

                if (!producto.estaActivo()) {
                    throw new ProductoInactivoException();
                }

                detallesConProductos.push({
                    cantidad: detalle.cantidad,
                    producto
                });
            }

            const venta = VentasFactory.create({
                detalles: detallesConProductos
            });
            const ventaCreada = await this.ventasRepo.create(venta);
            return VentaResponseMapper.toResponse(ventaCreada);
        });
    }
}