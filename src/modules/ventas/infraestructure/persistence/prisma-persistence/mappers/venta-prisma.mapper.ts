import { Prisma, Venta as VentaPrisma } from "../../../../../../generated/prisma";
import { DetalleVenta } from "../../../../domain/entities/detalle-venta.entity";
import { Venta } from "../../../../domain/entities/venta.entity";
import { VentasFactory } from "../../../../domain/factories/ventas.factory";
import { DetallesFactory } from "../../../../domain/factories/detalles.factory";

type VentaWithDetalle = Prisma.VentaGetPayload<{
    include: { detalles: true }
}>;

export class VentaPrismaMapper {
    public static toCreateInput(domain: Venta): Prisma.VentaUncheckedCreateInput {
        return {
            fecha: domain.getFecha(),
            total: domain.getTotal(),
            detalles: {
                create: domain.getDetalles().map(VentaPrismaMapper.detalleToCreateInput)
            }
        };
    }

    public static toDomain(prisma: VentaWithDetalle): Venta {
        return VentasFactory.reconstitute({
            id: prisma.id,
            total: Number(prisma.total),
            fecha: prisma.fecha,
            detalles: prisma.detalles.map(VentaPrismaMapper.detalleToDomain)
        });
    }

    private static detalleToCreateInput(domain: DetalleVenta): Prisma.DetalleVentaUncheckedCreateWithoutVentaInput {
        return {
            productoId: domain.getProductoId(),
            cantidad: domain.getCantidad(),
            precioUnitario: domain.getPrecioUnitario(),
            subtotal: domain.getSubtotal()
        };
    }

    private static detalleToDomain(prisma: VentaWithDetalle['detalles'][number]): DetalleVenta {
        return DetallesFactory.reconstitute({
            id: prisma.id,
            productoId: prisma.productoId,
            cantidad: prisma.cantidad,
            precioUnitario: Number(prisma.precioUnitario),
            subtotal: Number(prisma.subtotal)
        });
    }
}