class WorkService {
  constructor(private http: IHttpClient) {}

  async syncWorks(onUpdate: (works: WorkData[]) => void) {
    const works = await this.http.fetch<WorkData[]>('works', {
      method: 'GET',
    });
    onUpdate(works);
  }

  async getWorkByTitle(title: string): Promise<WorkData | null> {
    const work = await this.http.fetch<WorkData | null>(`works/${title}`, {
      method: 'GET',
    });

    return work;
  }

  async addWork(work: WorkInputData): Promise<WorkData> {
    const body = JSON.stringify(work);

    const data = await this.http.fetch<WorkData>(`works`, {
      method: 'POST',
      body,
    });
    return data;
  }

  async updateWork(work: WorkInputData): Promise<WorkData> {
    const { title } = work;
    const body = JSON.stringify(work);

    const data = await this.http.fetch<WorkData>(`works/${title}`, {
      method: 'PUT',
      body,
    });
    return data;
  }

  async deleteWork(work: WorkData) {
    const { title } = work;
    await this.http.fetch(`works/${title}`, { method: 'DELETE' });
  }
}

export default WorkService;
