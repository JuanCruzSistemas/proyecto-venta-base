import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from "@nestjs/common";

import { VentaResponse } from "../../../application/responses/venta.response";
import { CreateVentaDto } from "../../../../../processes/create-venta/application/dtos/create-venta.dto";

import { type VentasApplicationPort, VENTAS_APPLICATION_PORT } from "../../../application/ports/ventas-application.port";
import { type CreateVentaPort, CREATE_VENTA_PORT } from "../../../../../processes/create-venta/application/ports/create-venta.port";

@Controller('ventas')
export class VentasController {
    constructor(
        @Inject(VENTAS_APPLICATION_PORT)
        private readonly facade: VentasApplicationPort,
        @Inject(CREATE_VENTA_PORT)
        private readonly createFacade: CreateVentaPort
    ) {}

    @Get()
    async findAll(): Promise<VentaResponse[]> {
        return this.facade.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<VentaResponse> {
        return this.facade.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreateVentaDto): Promise<VentaResponse> {
        return this.createFacade.create(dto);
    }
}
