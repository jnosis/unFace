class WorkRepository {
  constructor(private baseURL: string) {}

  async fetch(url: string, options: any) {
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

    return data;
  }

  async syncWorks(onUpdate: (works: WorkData[]) => void) {
    const works = await this.fetch('works', { method: 'GET' });
    onUpdate(works);
  }

  async getWorkByTitle(title: string): Promise<WorkData | null> {
    const work = await this.fetch(`works/${title}`, { method: 'GET' });

    return work;
  }

  async addWork(work: WorkInputData) {
    const body = JSON.stringify(work);

    const data = await this.fetch(`works`, {
      method: 'POST',
      body,
    });
    return data as WorkData;
  }

  async updateWork(work: WorkInputData) {
    const { title } = work;
    const body = JSON.stringify(work);

    const data = await this.fetch(`works/${title}`, {
      method: 'PUT',
      body,
    });
    return data as WorkData;
  }

  async deleteWork(work: WorkData) {
    const { title } = work;
    await this.fetch(`works/${title}`, { method: 'DELETE' });
  }
}

export default WorkRepository;
