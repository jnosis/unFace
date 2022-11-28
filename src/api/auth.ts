import httpClient from '../network/http';

export class AuthService {
  constructor(private http: IHttpClient) {}

  async signup(user: UserInfo): Promise<UserToken> {
    const { username, password, name, email } = user;
    return await this.http.fetch<UserToken>('api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password, name, email }),
    });
  }

  async login(loginInfo: LoginInfo): Promise<UserToken> {
    const { username, password } = loginInfo;
    return await this.http.fetch<UserToken>('api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async logout() {
    return await this.http.fetch<void>('api/auth/logout', {
      method: 'POST',
    });
  }

  async me(): Promise<UserToken> {
    return await this.http.fetch<UserToken>(`api/auth/me`, {
      method: 'GET',
    });
  }
}

const authService = new AuthService(httpClient);

export default authService;
