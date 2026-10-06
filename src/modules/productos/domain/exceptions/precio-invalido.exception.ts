import { DomainException } from "../../../../common/domain/exceptions/domain-exception";
import { AppErrorCode } from "../../../../common/exceptions/app-error-code.enum";

export class PrecioInvalidoException extends DomainException {
    constructor() {
        super(
            'Precio no valido, debe ser mayor a 0',
            AppErrorCode.INVALID_INPUT
        );
    }
}
