import { ProductoOrmMapper } from "../../../../../productos/infraestructure/persistence/typeorm-persistence/mappers/producto-orm.mapper";
import { DetalleVenta } from "../../../../domain/entities/detalle-venta.entity";
import { Venta } from "../../../../domain/entities/venta.entity";
import { DetallesFactory } from "../../../../domain/factories/detalles.factory";
import { VentasFactory } from "../../../../domain/factories/ventas.factory";
import { DetalleVentaEntity } from "../entities/detalle-venta.orm-entity";
import { VentaEntity } from "../entities/venta.orm-entity";

export class VentaOrmMapper {
    public static toOrm(domain: Venta): VentaEntity {
        const orm = new VentaEntity();

        const id = domain.getId();
        if (id) {
            orm.id = id;
        }
        orm.fecha = domain.getFecha();
        orm.total = domain.getTotal();
        orm.detallesVenta = domain.getDetalles().map(this.detalleToOrm);

        return orm;
    }

    public static toDomain(domain: VentaEntity): Venta {
        return VentasFactory.reconstitute({
            id: domain.id,
            total: domain.total,
            fecha: domain.fecha,
            detalles: domain.detallesVenta.map(this.detalleToDomain)
        });
    }

    private static detalleToDomain(ormDetalle: DetalleVentaEntity): DetalleVenta {
        return DetallesFactory.reconstitute({
            id: ormDetalle.id,
            productoId: ormDetalle.producto.id,
            producto: ProductoOrmMapper.toDomain(ormDetalle.producto),
            cantidad: ormDetalle.cantidad,
            precioUnitario: ormDetalle.precioUnitario,
            subtotal: ormDetalle.subtotal
        });
    }

    private static detalleToOrm(domainDetalle: DetalleVenta): DetalleVentaEntity {
        const orm = new DetalleVentaEntity();

        const id = domainDetalle.getId();
        if (id) {
            orm.id = id;
        }
        orm.producto = ProductoOrmMapper.toOrm(domainDetalle.getProducto());
        orm.cantidad = domainDetalle.getCantidad();
        orm.precioUnitario = domainDetalle.getPrecioUnitario();
        orm.subtotal = domainDetalle.getSubtotal();

        return orm;
    }
}