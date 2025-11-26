import { logger, LoggedError } from "./logger";

export interface HttpOptions<TBody> {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: HeadersInit;
  body?: TBody;
  retries?: number;
  cache?: RequestCache;
  nextConfig?: NextFetchRequestConfig;
}

export interface HttpResponse<TData> {
  data: TData;
  status: number;
}

const DEFAULT_RETRIES = 2;

export async function httpRequest<TData = unknown, TBody = unknown>(
  url: string,
  options: HttpOptions<TBody> = {}
): Promise<HttpResponse<TData>> {
  const { method = "GET", headers, body, retries = DEFAULT_RETRIES, cache, nextConfig } = options;
  let attempt = 0;
  let lastError: LoggedError | undefined;

  while (attempt <= retries) {
    try {
      const resolvedHeaders = new Headers(headers);
      if (!(body instanceof FormData) && !resolvedHeaders.has("Content-Type")) {
        resolvedHeaders.set("Content-Type", "application/json");
      }

      const response = await fetch(url, {
        method,
        headers: resolvedHeaders,
        body: body
          ? body instanceof FormData
            ? (body as BodyInit)
            : JSON.stringify(body)
          : undefined,
        cache,
        next: nextConfig,
      });

      if (!response.ok) {
        const error: LoggedError = new Error(`Request failed with status ${response.status}`);
        error.status = response.status;
        error.details = await safeParseJson(response);
        throw error;
      }

      const payload = (await safeParseJson(response)) as TData;
      return { data: payload, status: response.status };
    } catch (error) {
      lastError = error as LoggedError;
      logger.warn(`HTTP request attempt ${attempt + 1} failed`, {
        scope: "http-request",
        metadata: { url, method, status: lastError.status },
      });
      attempt += 1;
      if (attempt > retries) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 200 * attempt));
    }
  }

  logger.error("Exhausted retries for HTTP request", lastError, { scope: "http-request" });
  const error: LoggedError = lastError || new Error("Unknown HTTP error");
  error.status = error.status ?? 500;
  throw error;
}

async function safeParseJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch (error) {
    logger.warn("Response body is not valid JSON", { scope: "http-request" });
    return {};
  }
}
