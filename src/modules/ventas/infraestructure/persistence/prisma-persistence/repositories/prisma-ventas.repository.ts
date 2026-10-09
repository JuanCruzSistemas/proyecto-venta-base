import { Injectable } from "@nestjs/common";
import { GestorPrismaClient } from "../../../../../../common/infraestructure/prisma-uow/gestor-prisma-client";
import { Venta } from "../../../../domain/entities/venta.entity";
import { IVentasRepository } from "../../../../domain/repositories/ventas.repository.interface";
import { VentaPrismaMapper } from "../mappers/venta-prisma.mapper";

@Injectable()
export class PrismaVentasRepository implements IVentasRepository {
    constructor(
        private readonly gestor: GestorPrismaClient
    ) {}

    async findAll(): Promise<Venta[]> {
        const ventas = await this.gestor.actual.venta.findMany({
            include: { detalles: true }
        });
        return ventas.map(VentaPrismaMapper.toDomain);
    }

    async findOne(id: number): Promise<Venta | null> {
        const venta = await this.gestor.actual.venta.findUnique({
            where: { id },
            include: { detalles: true }
        });
        return venta ? VentaPrismaMapper.toDomain(venta) : null;
    }

    async create(data: Venta): Promise<Venta> {
        const ventaCreated = await this.gestor.actual.venta.create({
            data: VentaPrismaMapper.toCreateInput(data),
            include: { detalles: true }
        });
        return VentaPrismaMapper.toDomain(ventaCreated);
    }
}
