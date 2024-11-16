//import { Token } from '../../util/token/token';
//import { HttpError } from './HttpError';
import { RequestHeaders, RequestOptions, RestClient } from './fetch';

export class FetchRestClient implements RestClient {
  private headers: RequestHeaders;
  private baseUrl: string;

  constructor() {
    this.headers = {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    this.baseUrl = import.meta.env.VITE_BACKEND_URL;
  }

  async get(url: string, options?: RequestOptions): Promise<Response> {
    return this.fetch(url, 'GET', undefined, options);
  }

  async put<T>(url: string, body: T, options?: RequestOptions): Promise<Response> {
    return this.fetch(url, 'PUT', body, options);
  }

  async post(url: string, body: unknown, options?: RequestOptions): Promise<Response> {
    return this.fetch(url, 'POST', body, options);
  }

  async delete(url: string, options?: RequestOptions | undefined): Promise<Response> {
    return this.fetch(url, 'DELETE', undefined, options);
  }

  private async fetch<T>(
    url: string,
    method: string,
    body?: T,
    options?: RequestOptions | undefined
  ): Promise<Response> {
    //const login = Token.get();
    //
    const res = await fetch(`${this.baseUrl}/${url}`, {
      headers: {
        ...this.headers,
        ...options?.headers,
        //...(login?.token ? { Authorization: `Bearer ${login.token}` } : {}),
      },
      method,
      // credentials: 'include',
      body: body && JSON.stringify(body),
    });

    if (res.status === 401) {
      //Token.delete();
      window.location.href = '/public/login';
      throw new Error('Unauthorized');
    }

    if (!res.ok) {
      const contentType = res.headers.get('content-type');

      if (contentType && contentType.indexOf('application/json') !== -1) {
        const body = await res.json();

        if (body?.message) {
          //throw new HttpError(res, body.message);
        }
      }
      //throw new HttpError(res, 'An error occurred');
    }

    return res;
  }

  static create(): FetchRestClient {
    return new FetchRestClient();
  }
}
