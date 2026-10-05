import { DomainException } from "../../../../common/domain/exceptions/domain-exception";
import { AppErrorCode } from "../../../../common/exceptions/app-error-code.enum";

export class NombreInvalidoException extends DomainException {
    constructor() {
        super(
            'Nombre de categoría inválido',
            AppErrorCode.INVALID_INPUT
        );
    }
}