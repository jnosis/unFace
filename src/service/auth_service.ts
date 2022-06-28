import { FirebaseApp } from 'firebase/app';
import * as FirebaseAuth from 'firebase/auth';
import * as FirebaseDB from 'firebase/database';

class AuthService {
  firebaseAuth: FirebaseAuth.Auth;
  googleProvider: FirebaseAuth.GoogleAuthProvider;
  githubProvider: FirebaseAuth.GithubAuthProvider;
  private readonly database: FirebaseDB.Database;

  constructor(app: FirebaseApp) {
    this.database = FirebaseDB.getDatabase(app);
    this.firebaseAuth = FirebaseAuth.getAuth();
    this.googleProvider = new FirebaseAuth.GoogleAuthProvider();
    this.githubProvider = new FirebaseAuth.GithubAuthProvider();
  }

  login(providerName: AuthProvider): Promise<FirebaseAuth.UserCredential> {
    const authProvider = this.getProvider(providerName);
    return FirebaseAuth.signInWithPopup(this.firebaseAuth, authProvider);
  }

  logout() {
    return this.firebaseAuth.signOut();
  }

  onAuthChange(onUserChanged: (user: FirebaseAuth.User | null) => void) {
    this.firebaseAuth.onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }

  getProvider(providerName: AuthProvider) {
    switch (providerName) {
      case 'Google':
        return this.googleProvider;
      case 'Github':
        return this.githubProvider;

      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }

  async getAdmins(): Promise<{ [uid: string]: boolean } | null> {
    const query = FirebaseDB.ref(this.database, `admins`);
    const value = (await FirebaseDB.get(query)).val();
    return value;
  }
}
export default AuthService;
