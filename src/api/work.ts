import httpClient from '../network/http';

export class WorkService {
  constructor(private http: IHttpClient) {}

  async syncWorks(onUpdate: (works: WorkData[]) => void) {
    const works = await this.http.fetch<WorkData[]>('api/works', {
      method: 'GET',
    });
    onUpdate(works);
  }

  async getWorks() {
    const works = await this.http.fetch<WorkData[]>('api/works', {
      method: 'GET',
    });
    return works;
  }

  async getWorkByTitle(title: string): Promise<WorkData | null> {
    const work = await this.http.fetch<WorkData | null>(`api/works/${title}`, {
      method: 'GET',
    });

    return work;
  }

  async addWork(work: WorkInputData): Promise<WorkData> {
    const body = JSON.stringify(work);

    const data = await this.http.fetch<WorkData>(`api/works`, {
      method: 'POST',
      body,
    });
    return data;
  }

  async updateWork(work: WorkInputData): Promise<WorkData> {
    const { title } = work;
    const body = JSON.stringify(work);

    const data = await this.http.fetch<WorkData>(`api/works/${title}`, {
      method: 'PUT',
      body,
    });
    return data;
  }

  async deleteWork(work: WorkData) {
    const { title } = work;
    await this.http.fetch(`api/works/${title}`, { method: 'DELETE' });
    return title;
  }
}

const workService = new WorkService(httpClient);

export default workService;
