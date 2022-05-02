export function convertToRawContentURL(url: string, branch: string): string {
  return `${url.replace('github.com', 'raw.githubusercontent.com')}/${branch}`;
}

export function convertToRepoURL(url: string, branch: string): string {
  return `${url}/tree/${branch}`;
}

export function convertToRepoContentURL(url: string, branch: string): string {
  return `${url}/blob/${branch}`;
}
