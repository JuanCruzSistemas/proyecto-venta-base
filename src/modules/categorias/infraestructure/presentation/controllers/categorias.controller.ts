import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";

import { CreateCategoriaDto, UpdateCategoriaDto } from "../../../application/dtos";
import { CategoriaResponse } from "../../../application/responses/categoria.response";

import { type CategoriasApplicationPort, CATEGORIAS_APPLICATION_PORT } from "../../../application/ports/categorias-application.port";
import { type DeleteCategoriaPort, DELETE_CATEGORIA_PORT } from "../../../../../processes/delete-categoria/ports/delete-categoria.port";

@Controller('categorias')
export class CategoriasController {
    constructor(
        @Inject(CATEGORIAS_APPLICATION_PORT)
        private readonly facade: CategoriasApplicationPort,
        @Inject(DELETE_CATEGORIA_PORT)
        private readonly deleteFacade: DeleteCategoriaPort
    ) {}

    @Get()
    async findAll(): Promise<CategoriaResponse[]> {
        return this.facade.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<CategoriaResponse> {
        return this.facade.findOne(id);
    }

    @Post()
    async create(@Body() dto: CreateCategoriaDto): Promise<CategoriaResponse> {
        return this.facade.create(dto);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoriaDto): Promise<CategoriaResponse> {
        return this.facade.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<CategoriaResponse> {
        return this.deleteFacade.delete(id);
    }
}
