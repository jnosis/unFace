const MIN_PASSWORD_LEN = 8;

export function validateString(str: string): boolean {
  return str.length > 0 && str[0] !== ' ';
}

export function validateStringWithoutSpace(str: string): boolean {
  return !str.includes(' ') && str.length > 0;
}

// TODO: make regexp
export function validatePassword(username: string) {
  return !username.includes(' ') && username.length >= MIN_PASSWORD_LEN;
}

export function validateEmail(email: string): boolean {
  const emailRegExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  return emailRegExp.test(email);
}

export function validateUser(name: string, value: string): boolean {
  switch (name) {
    case 'username':
      return validateStringWithoutSpace(value);
    case 'password':
      return validatePassword(value);
    case 'name':
      return validateString(value);
    case 'email':
      return validateEmail(value);
    default:
      throw new Error(`User property(${name}) is undefined`);
  }
}

export function validateProjectUrl(repoURL: string): boolean {
  const repoRegExps = [/^(https?\:\/\/)?[a-z0-9.-]+\.[a-z]{2,4}[a-z0-9.-\/]*/];
  return !repoURL || repoRegExps.every((exp) => exp.test(repoURL));
}

export function validateRepoUrl(repoURL: string): boolean {
  const repoRegExps = [/^(https?\:\/\/)?github.com\/[\w]+\/[\w]+/];
  return repoRegExps.every((exp) => exp.test(repoURL));
}

export function validateRepoBranch(repoBranch: string): boolean {
  return !repoBranch || validateStringWithoutSpace(repoBranch);
}

export function validateWork(name: string, value: string): boolean {
  switch (name) {
    case 'title':
      return validateStringWithoutSpace(value);
    case 'projectURL':
      return validateProjectUrl(value);
    case 'repoUrl':
      return validateRepoUrl(value);
    case 'repoBranch':
      return validateRepoBranch(value);
    default:
      throw new Error(`Work property(${name}) is undefined`);
  }
}
