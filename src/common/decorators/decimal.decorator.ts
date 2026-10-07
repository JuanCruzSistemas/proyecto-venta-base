import { Column } from "typeorm";

export function DecimalColumn() {
    return Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    });
}