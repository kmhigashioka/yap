import auth from './auth';
require('whatwg-fetch');

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function request<T>(
  url: string,
  options?: any | undefined,
): Promise<T> {
  const requestUrl =
    url.indexOf('http') === 0
      ? url
      : `${process.env.REACT_APP_API_URL || ''}${url}`;
  return fetch(requestUrl, options).then(checkStatus).then(parseJSON);
}

function checkStatus(response: Response): Response {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new ResponseError(response.statusText);
  error.response = response;
  throw error;
}

export class ResponseError extends Error {
  response: Response;

  constructor(message: string) {
    super(message);

    this.response = new Response();
  }
}

function parseJSON(response: Response): Promise<any> | null {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

let currentRequestingTokenRenewal: Promise<void> | null = null;

export async function requestWithToken<T>(
  url: string,
  options?: any | undefined,
): Promise<T> {
  try {
    if (!auth.accessToken) {
      const err = new ResponseError('Request for token.');
      err.response = new Response(null, { status: 401 });
      throw err;
    }
    const res = await usualApiCall<T>(url, options);
    return res;
  } catch (err) {
    if (err.response.status === 401) {
      try {
        if (currentRequestingTokenRenewal === null) {
          currentRequestingTokenRenewal = requestForTokenRenewal();
        }
        await currentRequestingTokenRenewal;
        return usualApiCall<T>(url, options);
      } catch (tokenerr) {
        localStorage.clear();
        throw tokenerr;
      }
    }
    return Promise.reject(err);
  }
}

function usualApiCall<T>(url: string, options?: any | undefined): Promise<T> {
  const authorization = `bearer ${auth.accessToken}`;
  if (options) {
    const { headers } = options;
    const requestOptions = {
      ...options,
      headers: { ...headers, Authorization: authorization },
    };
    return request<T>(url, requestOptions);
  }
  return request<T>(url, { headers: { Authorization: authorization } });
}

async function requestForTokenRenewal(): Promise<void> {
  const body = `grant_type=refresh_token&client_id=mvc&refresh_token=${auth.refreshToken}`;
  try {
    const data = await request<TokenResponse>('/connect/token', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    auth.accessToken = data.access_token;
    localStorage.setItem('refresh_token', data.refresh_token);
  } catch (err) {
    throw new ResponseError('Expired session.');
  } finally {
    currentRequestingTokenRenewal = null;
  }
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}
