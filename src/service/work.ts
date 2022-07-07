class WorkService {
  constructor(private http: IHttpClient) {}

  async syncWorks(onUpdate: (works: WorkData[]) => void) {
    const works = await this.http.fetch('works', { method: 'GET' });
    onUpdate(works);
  }

  async getWorkByTitle(title: string): Promise<WorkData | null> {
    const work = await this.http.fetch(`works/${title}`, { method: 'GET' });

    return work;
  }

  async addWork(work: WorkInputData) {
    const body = JSON.stringify(work);

    const data = await this.http.fetch(`works`, {
      method: 'POST',
      body,
    });
    return data as WorkData;
  }

  async updateWork(work: WorkInputData) {
    const { title } = work;
    const body = JSON.stringify(work);

    const data = await this.http.fetch(`works/${title}`, {
      method: 'PUT',
      body,
    });
    return data as WorkData;
  }

  async deleteWork(work: WorkData) {
    const { title } = work;
    await this.http.fetch(`works/${title}`, { method: 'DELETE' });
  }
}

export default WorkService;
