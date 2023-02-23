import { Localized } from "../localizableStrings/localized";

export class AppError {

    static mapError(code: string, callback: (message: string) => void) {

        switch (code) {
            case 'EEXIST': callback(Localized.error.exists);
            case 'EREAD': callback(Localized.error.read);
        }
    }

    static mapDirErrors(error: unknown, callback: (message: string) => void) {
        if (error instanceof Error) {
            
            if (error.message.includes('EEXIST')) {
                AppError.mapError('EEXIST', callback);
            }
        }
    }
}