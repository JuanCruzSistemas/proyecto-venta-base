import { Injectable } from "@nestjs/common";

import {
    CreateCategoriaUseCase,
    FindAllCategoriasUseCase,
    FindOneCategoriaUseCase,
    UpdateCategoriaUseCase
} from "../use-cases";
import { CreateCategoriaDto, UpdateCategoriaDto } from "../dtos";
import { CategoriaResponse } from "../responses/categoria.response";

@Injectable()
export class CategoriasFacade {
    constructor(
        private readonly createCategoriaUseCase: CreateCategoriaUseCase,
        private readonly findOneCategoriaUseCase: FindOneCategoriaUseCase,
        private readonly findAllCategoriasUseCase: FindAllCategoriasUseCase,
        private readonly updateCategoriaUseCase: UpdateCategoriaUseCase,
    ) {}

    async create(dto: CreateCategoriaDto): Promise<CategoriaResponse> {
        return this.createCategoriaUseCase.execute(dto);
    }

    async findOne(id: number): Promise<CategoriaResponse> {
        return this.findOneCategoriaUseCase.execute(id);
    }

    async findAll(): Promise<CategoriaResponse[]> {
        return this.findAllCategoriasUseCase.execute();
    }

    async update(id: number, dto: UpdateCategoriaDto): Promise<CategoriaResponse> {
        return this.updateCategoriaUseCase.execute(id, dto);
    }
}
