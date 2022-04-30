import FirebaseAuth from 'firebase/auth';

class AuthService {
  firebaseAuth: FirebaseAuth.Auth;
  googleProvider: FirebaseAuth.GoogleAuthProvider;
  githubProvider: FirebaseAuth.GithubAuthProvider;

  constructor() {
    this.firebaseAuth = FirebaseAuth.getAuth();
    this.googleProvider = new FirebaseAuth.GoogleAuthProvider();
    this.githubProvider = new FirebaseAuth.GithubAuthProvider();
  }

  login(providerName: AuthProvider) {
    const authProvider = this.getProvider(providerName);
    return FirebaseAuth.signInWithPopup(this.firebaseAuth, authProvider);
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  onAuthChange(onUserChanged: Function) {
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
}
export default AuthService;
