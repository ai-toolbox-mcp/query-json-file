export interface MCPToolResponse<T = unknown> {
  content: Array<{
    data?: T;
    text?: string;
    type: "image" | "resource" | "text";
  }>;
  isError?: boolean;
}

export interface QueryJsonFileServerConfig {
  logLevel?: "debug" | "error" | "info" | "warn";
}

export class MCPError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly details?: null | Record<string, unknown>,
  ) {
    super(message);
    this.name = "MCPError";
  }
}
