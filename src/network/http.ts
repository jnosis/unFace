import { env } from '../../config/env';

export class HttpClient implements IHttpClient {
  constructor(private baseURL: string) {}

  async fetch<Data>(url: string, options: RequestInit) {
    const res = await fetch(`${this.baseURL}/${url}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
      credentials: 'include',
    });
    let data;
    try {
      if (res.status !== 204) data = await res.json();
    } catch (error) {
      console.log(error);
    }

    if (res.status > 299 || res.status < 200) {
      const message =
        data && data.message ? data.message : 'Something went wrong';
      throw new Error(message);
    }

    return data as Data;
  }
}

const httpClient = new HttpClient(env.database.url);

export default httpClient;
