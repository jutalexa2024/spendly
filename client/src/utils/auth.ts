import { jwtDecode, JwtPayload } from 'jwt-decode';

interface ExtendedJwt extends JwtPayload {
  data: {
    username: string;
    email: string;
    _id: string;
  };
}

class AuthService {
    getProfile() {
      return jwtDecode<ExtendedJwt>(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
      }

      isTokenExpired(token: string) {
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          if (decoded.exp && decoded.exp < Date.now() / 1000) {
            return true;
          }
          return false;
        } catch (err) {
          return false;
        }
      }

      getToken() {
        return localStorage.getItem('id_token') || '';
      }


      login(idToken: string) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
      }


      logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
      }
    }
    
    const authService = new AuthService();
    export default authService;
