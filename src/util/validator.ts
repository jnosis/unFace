export function validateTitle(title: string): boolean {
  return title.length > 0;
}

export function validateRepo(repoURL: string): boolean {
  const repoRegExps = [/^(https?\:\/\/)?github.com\//];
  return repoRegExps.every((exp) => exp.test(repoURL));
}
