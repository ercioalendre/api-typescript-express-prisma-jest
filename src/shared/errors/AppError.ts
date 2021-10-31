export interface IError {
  message: string;
  statusCode: number;
  inputError?: string[];
  operationalError?: boolean;
}

export function isOperationalError(error: Error): boolean {
  if (error instanceof AppError) {
    return error.operationalError;
  }
  return false;
}

export default class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly inputError: string[];
  public readonly operationalError: boolean;

  constructor({ message, statusCode = 500, inputError = [], operationalError = true }: IError) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.statusCode = statusCode;
    this.operationalError = operationalError;
    this.inputError = inputError;
    Error.captureStackTrace(this);
  }
}
