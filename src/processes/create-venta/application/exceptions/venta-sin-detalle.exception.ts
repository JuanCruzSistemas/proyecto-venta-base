import { ApplicationException } from "../../../../common/application/exceptions/application-exception";
import { AppErrorCode } from "../../../../common/exceptions/app-error-code.enum";

export class VentaSinDetallesException extends ApplicationException {
    constructor() {
        super(
            'Venta sin detalles',
            AppErrorCode.INVALID_INPUT
        );
    }
}
