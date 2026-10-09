import { Injectable } from "@nestjs/common";
import { GestorEntityManager } from "../../../../../../common/infraestructure/typeorm-uow/gestor-entity-manager";

import { Venta } from "../../../../domain/entities/venta.entity";
import { IVentasRepository } from "../../../../domain/repositories/ventas.repository.interface";
import { VentaEntity } from "../entities/venta.orm-entity";
import { VentaOrmMapper } from "../mappers/venta-orm.mapper";

@Injectable()
export class TypeOrmVentasRepository implements IVentasRepository {
    constructor(
        private readonly gestor: GestorEntityManager
    ) {}

    async findAll(): Promise<Venta[]> {
        const ventas = await this.gestor.actual.find(VentaEntity, {
            relations: {
                detallesVenta: true
            }
        });
        return ventas.map(VentaOrmMapper.toDomain);
    }

    async findOne(id: number): Promise<Venta | null> {
        const venta = await this.gestor.actual.findOne(VentaEntity, {
            where: { id },
            relations: {
                detallesVenta: true
            }
        });
        return venta ? VentaOrmMapper.toDomain(venta) : null;
    }

    async create(data: Venta): Promise<Venta> {
        const ventaOrm = VentaOrmMapper.toOrm(data);
        const ventaCreated = await this.gestor.actual.save(ventaOrm);
        return VentaOrmMapper.toDomain(ventaCreated);
    }
}
