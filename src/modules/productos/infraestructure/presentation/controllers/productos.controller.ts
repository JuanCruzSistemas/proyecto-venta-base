import { Body, Controller, Get, NotImplementedException, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";

import { ProductosFacade } from "../../../application/facade/productos.facade";
import { CreateProductoDto, FiltroActivoDto, UpdateProductoDto } from "../../../application/dtos";
import { ProductoResponse } from "../../../application/responses/producto.response";

@Controller('productos')
export class ProductosController {
    constructor(
        private readonly facade: ProductosFacade
    ) {}

    @Post()
    async create(@Body() dto: CreateProductoDto): Promise<ProductoResponse> {
        throw new NotImplementedException()
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
        throw new NotImplementedException();
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
