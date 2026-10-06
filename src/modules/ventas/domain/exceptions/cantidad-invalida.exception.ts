import { DomainException } from "../../../../common/domain/exceptions/domain-exception";
import { AppErrorCode } from "../../../../common/exceptions/app-error-code.enum";

export class CantidadInvalidaException extends DomainException {
    constructor() {
        super(
            'Cantidad inválida, debe ser mayor a 0',
            AppErrorCode.INVALID_INPUT
        );
    }
}
