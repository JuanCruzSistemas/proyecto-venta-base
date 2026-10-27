import { Body, Controller, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";

import { CreateProductoDto, FiltroActivoDto, UpdateProductoDto } from "../../../application/dtos";
import { ProductoResponse } from "../../../application/responses/producto.response";

import { type ProductosApplicationPort, PRODUCTOS_APPLICATION_PORT } from "../../../application/ports/productos-application.port";
import { type ManageProductoPort,MANAGE_PRODUCTO_PORT } from "../../../../../processes/manage-producto/ports/manage-producto.port";

@Controller('productos')
export class ProductosController {
    constructor(
        @Inject(PRODUCTOS_APPLICATION_PORT)
        private readonly facade: ProductosApplicationPort,
        @Inject(MANAGE_PRODUCTO_PORT)
        private readonly manageFacade: ManageProductoPort
    ) {}

    @Post()
    async create(@Body() dto: CreateProductoDto): Promise<ProductoResponse> {
        return this.manageFacade.create(dto);
    }

    @Get()
    async findAll(@Query() filtro: FiltroActivoDto): Promise<ProductoResponse[]> {
        return this.facade.findAll(filtro);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductoResponse> {
        return this.facade.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductoDto): Promise<ProductoResponse> {
        return this.manageFacade.update(id, dto);
    }

    @Patch(':id/desactivar')
    async deactivate(@Param('id', ParseIntPipe) id: number): Promise<ProductoResponse> {
        return this.facade.deactivate(id);
    }

    @Patch(':id/activar')
    async activate(@Param('id', ParseIntPipe) id: number): Promise<ProductoResponse> {
        return this.facade.activate(id);
    }
}
