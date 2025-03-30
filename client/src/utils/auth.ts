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

    