import { Handlers } from '$fresh/server.ts';
import type { WorkData } from '~/types.ts';

export const works = [
  {
    id: '1',
    title: 'unFace',
    description: 'master branch',
    repo: { url: 'https://github.com/jnosis/unFace', branch: 'master' },
    techs: ['React', 'TypeScript', 'webpack'],
    thumbnail: { fileName: '', fileUrl: '' },
  },
  {
    id: '2',
    title: 'unFace-netlify',
    description: 'Deprecated',
    repo: { url: 'https://github.com/jnosis/unFace', branch: 'netlify' },
    techs: ['React', 'TypeScript', 'webpack'],
    thumbnail: { fileName: '', fileUrl: '' },
  },
  {
    id: '3',
    title: 'unFace-deno',
    description: 'WIP',
    repo: { url: 'https://github.com/jnosis/unFace', branch: 'deno' },
    techs: ['Deno', 'Fresh', 'Preact', 'twind', 'TypeScript'],
    thumbnail: { fileName: '', fileUrl: '' },
  },
];

export const handler: Handlers<WorkData[]> = {
  GET() {
    return new Response(JSON.stringify(works));
  },
};
