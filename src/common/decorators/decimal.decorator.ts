import { Column } from "typeorm";

export function DecimalColumn() {
    return Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    });
}