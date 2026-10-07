import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { VentasFacade } from "../../../application/facades/ventas.facade";
import { VentaResponse } from "../../../application/responses/venta.response";
import { CreateVentaDto } from "../../../../../processes/create-venta/application/dtos/create-venta.dto";
import { CreateVentaFacade } from "../../../../../processes/create-venta/application/facades/create-venta.facade";

@Controller('ventas')
export class VentasController {
    constructor(
        private readonly facade: VentasFacade,
        private readonly createFacade: CreateVentaFacade
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