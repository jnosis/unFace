import type { WorkData } from '~/types.ts';
import http from '~/utils/http.ts';

const kv = await Deno.openKv();

export async function fetchData() {
  const works = await http.get<WorkData[]>('api/works');
  works.forEach(async (work) => {
    const { value } = await kv.get<WorkData>(['works', work.title]);
    if (!value || !isEqual(work, value)) {
      await kv.set(['works', work.title], work);
    }
  });
}

export async function initData() {
  let count = 0;
  const entries = kv.list<WorkData>({ prefix: ['works'] });
  for await (const { value } of entries) {
    if (value) count++;
  }

  if (count === 0) await fetchData();
}

export async function deleteAllData() {
  const entries = kv.list<WorkData>({ prefix: ['works'] });
  for await (const entry of entries) {
    await kv.delete(entry.key);
  }
}

export async function getWorks(): Promise<WorkData[]> {
  let works: WorkData[] = [];

  const entries = kv.list<WorkData>({ prefix: ['works'] });
  for await (const entry of entries) {
    works = [...works, entry.value];
  }

  return works;
}

export async function getWorkByTitle(title: string): Promise<WorkData | null> {
  const work = await kv.get<WorkData>(['works', title]);
  return work.value;
}

function isEqual(value: WorkData, other: WorkData) {
  if (value.id !== other.id) return false;
  if (value.description !== other.description) return false;
  if (value.projectUrl !== other.projectUrl) return false;
  if (value.repo.branch !== other.repo.branch) return false;
  if (value.repo.url !== other.repo.url) return false;
  if (value.techs.length !== other.techs.length) return false;
  if (value.thumbnail.fileName !== other.thumbnail.fileName) return false;
  if (value.thumbnail.fileUrl !== other.thumbnail.fileUrl) return false;
  return value.techs.reduce((prev, current) => {
    return prev && other.techs.includes(current);
  }, true);
}
