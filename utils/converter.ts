import type { WorkData } from '~/types.ts';
import showdown from 'showdown';

export function convertToRawContentUrl(url: string, branch: string): string {
  return `${url.replace('github.com', 'raw.githubusercontent.com')}/${branch}`;
}

export function convertToRepoUrl(url: string, branch: string): string {
  return `${url}/tree/${branch}`;
}

export function convertToRepoContentUrl(url: string, branch: string): string {
  return `${url}/blob/${branch}/`;
}

export function convertUrls(work?: WorkData | null) {
  const repoUrl = work ? convertToRepoUrl(work.repo.url, work.repo.branch) : '';

  const repoContentUrl = work
    ? convertToRepoContentUrl(work.repo.url, work.repo.branch)
    : '';

  const contentUrl = work
    ? convertToRawContentUrl(work.repo.url, work.repo.branch)
    : '';

  const projectUrl = work?.projectUrl || '';

  return { repoUrl, repoContentUrl, contentUrl, projectUrl };
}

const converter = new showdown.Converter();

export function convertMarkdownToHtml(
  markdown: string,
  repoContentUrl: string,
  contentUrl: string,
) {
  converter.setFlavor('github');
  const html = converter.makeHtml(markdown);
  return transformLinks(html, repoContentUrl, contentUrl);
}

function transformLinks(
  html: string,
  repoContentUrl: string,
  contentUrl: string,
) {
  return html
    .replaceAll('href="./', `href="${repoContentUrl}/`)
    .replaceAll('href="/', `href="${repoContentUrl}/`)
    .replaceAll('img src="./', `img src="${contentUrl}/`)
    .replaceAll('img src="/', `img src="${contentUrl}/`)
    .replaceAll('img src="image/', `img src="${contentUrl}/image/`);
}
