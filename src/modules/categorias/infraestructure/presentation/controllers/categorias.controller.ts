import { Body, Controller, Get, NotImplementedException, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateCategoriaDto } from "../../../application/dtos/create-categoria.dto";
import { UpdateCategoriaDto } from "../../../application/dtos/update-categoria.dto";

@Controller('categorias')
export class CategoriasController {
    @Get()
    async findAll() {
        throw new NotImplementedException();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        throw new NotImplementedException();
    }

    @Post()
    async create(@Body() dto: CreateCategoriaDto) {
        throw new NotImplementedException();
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoriaDto) {
        throw new NotImplementedException();
    }
}
