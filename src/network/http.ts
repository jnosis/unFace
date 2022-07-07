export default class HttpClient implements IHttpClient {
  constructor(private baseURL: string) {}

  async fetch<Data>(url: string, options: any) {
    const res = await fetch(`${this.baseURL}/${url}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
    let data;
    try {
      data = await res.json();
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
