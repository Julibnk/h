export interface RequestHeaders {
  [key: string]: string;
}

export interface RequestParameters {
  [key: string]: string;
}

export type ResponseType = 'json' | 'text' | 'blob' | 'arraybuffer';

export type ResponseWithMessage = {
  message: string;
};

export const isResponseWithMessage = (body: unknown): body is ResponseWithMessage => {
  return typeof body === 'object' && body !== null && 'message' in body;
};

export interface RequestOptions {
  headers?: RequestHeaders;
  params?: RequestParameters;
  responseType?: ResponseType;
  withCredentials?: boolean;
  timeout?: number;
}

export interface RestClient {
  get: (url: string, options?: RequestOptions) => Promise<Response>;
  put: <T>(url: string, body: T, options?: RequestOptions) => Promise<Response>;
  post:: <T>(url: string, body: T, options?: RequestOptions) => Promise<Response>;
  delete: (url: string, options?: RequestOptions) => Promise<Response>;
}
