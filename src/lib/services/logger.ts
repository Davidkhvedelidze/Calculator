export enum LogLevel {
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

interface LogContext {
  scope: string;
  traceId?: string;
  metadata?: Record<string, unknown>;
}

export interface LoggedError extends Error {
  status?: number;
  details?: unknown;
}

const formatLog = (level: LogLevel, message: string, context?: LogContext) => ({
  level,
  message,
  scope: context?.scope ?? "application",
  traceId: context?.traceId,
  metadata: context?.metadata,
  timestamp: new Date().toISOString(),
});

export const logger = {
  info: (message: string, context?: LogContext) => {
    console.info(JSON.stringify(formatLog(LogLevel.INFO, message, context)));
  },
  warn: (message: string, context?: LogContext) => {
    console.warn(JSON.stringify(formatLog(LogLevel.WARN, message, context)));
  },
  error: (message: string, error?: LoggedError, context?: LogContext) => {
    console.error(
      JSON.stringify(
        formatLog(LogLevel.ERROR, message, {
          ...context,
          metadata: {
            ...context?.metadata,
            stack: error?.stack,
            status: error?.status,
            details: error?.details,
          },
        })
      )
    );
  },
};
