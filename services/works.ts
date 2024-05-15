import type { FileData, PrevFileData, WorkData } from '~/types.ts';
import http from '~/utils/http.ts';

const kv = await Deno.openKv();

export async function fetchData() {
  const works = await http.get<WorkData[]>('api/works');

  const entries = kv.list<WorkData>({ prefix: ['works'] });
  for await (const { key, value: { title } } of entries) {
    const index = works.findIndex((work) => work.title === title);
    if (index === -1) await kv.delete(key);
  }

  works.forEach(async (work) => {
    const { value } = await kv.get<WorkData>(['works', work.title]);
    if (!value || !isEqual(work, value)) {
      const { thumbnail, ...others } = work;
      const saved: WorkData = {
        ...others,
        thumbnail: {
          name: isFileData(thumbnail) ? thumbnail.name : thumbnail.fileName,
          url: isFileData(thumbnail) ? thumbnail.url : thumbnail.fileUrl,
        },
      };
      await kv.set(['works', work.title], saved);
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
  if (!compareFileData(value.thumbnail, other.thumbnail)) return false;
  return value.techs.reduce((prev, current) => {
    return prev && other.techs.includes(current);
  }, true);
}

type FileDataLike = FileData | PrevFileData;

function compareFileData(value: FileDataLike, other: FileDataLike): boolean {
  let name1 = '';
  let url1 = '';
  let name2 = '';
  let url2 = '';
  if (isFileData(value)) {
    name1 = value.name;
    url1 = value.url;
    if (isFileData(other)) {
      name2 = other.name;
      url2 = other.url;
    } else {
      name2 = other.fileName;
      url2 = other.fileUrl;
    }
  } else {
    return false;
  }
  return name1 === name2 && url1 === url2;
}
function isFileData(value: FileDataLike): value is FileData {
  return !!(value as FileData).name;
}
