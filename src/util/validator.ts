const MIN_PASSWORD_LEN = 8;

export function validateString(str: string): boolean {
  return str.length > 0 && str[0] !== ' ';
}

export function validateUsername(username: string) {
  return !username.includes(' ') && username.length > 0;
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
      return validateUsername(value);
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

export function validateRepo(repoURL: string): boolean {
  const repoRegExps = [/^(https?\:\/\/)?github.com\/[\w]+\/[\w]+/];
  return repoRegExps.every((exp) => exp.test(repoURL));
}
