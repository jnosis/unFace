import config from '~/config.ts';

const baseUrl = config.database.url;

async function f<Data>(url: string, options?: RequestInit): Promise<Data> {
  const res = await fetch(`${baseUrl}/${url}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    credentials: 'include',
  });

  let data;

  try {
    if (res.status !== 204) data = await res.json();
  } catch (error) {
    throw new Error(error.message, { cause: res.status });
  }

  if (res.status > 299 || res.status < 200) {
    const message = data && data.message
      ? data.message
      : 'Something went wrong';
    throw new Error(message, { cause: res.status });
  }

  return data as Data;
}

const http = {
  async get<Data>(url: string, options?: Omit<RequestInit, 'method'>) {
    return await f<Data>(url, { ...options, method: 'GET' });
  },
};

export default http;
