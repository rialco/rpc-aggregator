export class RPCError extends Error {
  readonly message;
  private readonly code;

  constructor(message: string, code: string) {
    super(message);
    this.message = message;
    this.code = code;
  }
}
