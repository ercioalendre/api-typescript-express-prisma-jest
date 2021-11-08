export class AppError extends Error {
  public readonly message!: string;
  public readonly statusCode!: number;
  public readonly inputError?: string[] = [];
  public readonly operationalError?: boolean = true;

  constructor(props: Omit<AppError, "name">) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    Object.assign(this, props);
    Error.captureStackTrace(this);
  }
}

export function isOperationalError(error: Error): boolean | undefined {
  if (error instanceof AppError) {
    return error.operationalError;
  }
  return false;
}

export function appError(props: Omit<AppError, "name">): AppError {
  return new AppError(props);
}
