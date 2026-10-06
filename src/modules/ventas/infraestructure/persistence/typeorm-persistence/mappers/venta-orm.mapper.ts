import { Venta } from "../../../../domain/entities/venta.entity";
import { VentaEntity } from "../entities/venta.orm-entity";

export class VentaOrmMapper {
    static toOrm(domain: Venta): VentaEntity {
        const orm = new VentaEntity();

        if (domain.getId()) {
            
        }
    }
}