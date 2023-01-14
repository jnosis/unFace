import type { Repo, Techs, WorkData } from '~/types.ts';
import http from '~/utils/http.ts';

export async function getWorks(): Promise<WorkData[]> {
  const works = await http.get<WorkDataOld[]>('api/works');
  return works.map(convertURL2Url);
}

export async function getWorkByTitle(title: string): Promise<WorkData | null> {
  const work = await http.get<WorkDataOld | null>(`api/works/${title}`);
  return work && convertURL2Url(work);
}

type WorkDataOld = {
  id: string;
  title: string;
  description: string;
  techs: Techs;
  repo: Repo;
  projectURL?: string;
  thumbnail: {
    fileName: string;
    fileURL: string;
  };
};

function isOld(work: unknown): work is WorkDataOld {
  return !!(work as WorkDataOld).thumbnail.fileURL &&
    !(work as WorkData).thumbnail.fileUrl;
}

function convertURL2Url(work: WorkDataOld | WorkData): WorkData {
  if (isOld(work)) {
    const {
      id,
      title,
      description,
      techs,
      repo,
      projectURL,
      thumbnail: { fileName, fileURL },
    } = work;
    return {
      id,
      title,
      description,
      techs,
      repo,
      projectUrl: projectURL,
      thumbnail: { fileName, fileUrl: fileURL },
    };
  }
  return work;
}
