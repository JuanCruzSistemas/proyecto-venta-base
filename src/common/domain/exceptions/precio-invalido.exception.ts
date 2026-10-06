import { DomainException } from "./domain-exception";
import { AppErrorCode } from "../../exceptions/app-error-code.enum";

export class PrecioInvalidoException extends DomainException {
    constructor() {
        super(
            'Precio no valido, debe ser mayor a 0',
            AppErrorCode.INVALID_INPUT
        );
    }
}
