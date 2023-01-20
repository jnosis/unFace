import type { WorkData } from '~/types.ts';
import http from '~/utils/http.ts';

export async function getWorks(): Promise<WorkData[]> {
  return await http.get<WorkData[]>('api/works');
}

export async function getWorkByTitle(title: string): Promise<WorkData | null> {
  return await http.get<WorkData | null>(`api/works/${title}`);
}
