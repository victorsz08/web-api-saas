


export class ExceptionError extends Error {
    public statusCode: number;

    public constructor(message: string, statusCode: number) {
        super(message),
        this.statusCode = statusCode;
    };
};