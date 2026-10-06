import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";

import { CreateCategoriaDto, UpdateCategoriaDto } from "../../../application/dtos";
import { CategoriasFacade } from "../../../application/facades/categorias.facade";
import { CategoriaResponse } from "../../../application/responses/categoria.response";
import { DeleteCategoriaUseCase } from "../../../application/use-cases";

@Controller('categorias')
export class CategoriasController {
    constructor(
        private readonly facade: CategoriasFacade,
        private readonly deleteCategoriaUseCase: DeleteCategoriaUseCase
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
        return this.facade.delete(id);
    }
}
