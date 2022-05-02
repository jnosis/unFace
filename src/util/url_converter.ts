export function convertURL(url: string): string {
  return url.replaceAll('github.com', 'raw.githubusercontent.com');
}

export function convertReadme(readme: string, url: string, branch: string) {
  return readme.replaceAll('./', `${url}/${branch}/`);
}
