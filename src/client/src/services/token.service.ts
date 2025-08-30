import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

class TokenService {
  private _accessToken = '';
  private _refreshToken = '';

  constructor() {
    if (typeof window === 'undefined') return;

    this._accessToken = Cookies.get('accessToken') || '';
    this._refreshToken = Cookies.get('refreshToken') || '';
  }

  get accessToken() {
    return this._accessToken;
  }

  get refreshToken() {
    return this._refreshToken;
  }

  set accessToken(value: string) {
    this._accessToken = value;
    const decodedToken = jwtDecode<{ exp: number }>(value);
    Cookies.set('accessToken', value || '', {
      expires: decodedToken ? new Date(decodedToken.exp * 1000) : undefined,
      secure: true,
      sameSite: 'Strict',
    });
  }

  set refreshToken(value: string) {
    this._refreshToken = value;
    if (value) {
      localStorage.setItem('refreshToken', value);
    } else {
      localStorage.removeItem('refreshToken');
    }
  }

  clearTokens() {
    this._accessToken = '';
    this._refreshToken = '';
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  }
}

export default new TokenService() as TokenService;
