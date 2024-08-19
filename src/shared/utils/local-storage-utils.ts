import { jwtDecode } from 'jwt-decode';

import { User } from '@/shared/types/api';

import { LOCAL_STORAGE_KEYS } from './global-constant-util';

const localStorageUtil = (() => {
  return {
    //  const useAuth = () => useContext(AuthContext);

    getUserData: (): User | null => {
      if (typeof Storage === 'undefined') return null;
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_INFO_KEY);
      if (!storedUser) {
        return null;
      }
      return JSON.parse(storedUser);
    },

    setUserData: (user: Partial<User>) => {
      try {
        console.log(user);

        if (user?.constructor.name !== 'Object') {
          throw new Error('No valid data found');
        }
        if (Object.keys(user).length === 0) {
          throw new Error('No data found');
        }
        if (typeof Storage === 'undefined') {
          throw new Error('No valid storage type found');
        }
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.USER_INFO_KEY,
          JSON.stringify(user),
        );
      } catch (error) {
        console.log((error as any).message);
      }
    },

    clearUserData: (): void => {
      if (typeof Storage === 'undefined') return;
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_INFO_KEY);
    },
    clearToken: (): void => {
      if (typeof Storage === 'undefined') return;
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN_KEY);
    },

    getRefreshToken: () => {
      if (typeof Storage === 'undefined') return false;
      return JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEYS.USER_INFO_KEY) || '{}',
      )?.refreshToken;
    },

    getAccessToken: () => {
      if (typeof Storage === 'undefined') {
        return new Error('Storage type not valid');
      }
      const storedToken = localStorage.getItem(
        LOCAL_STORAGE_KEYS.AUTH_TOKEN_KEY,
      );

      if (!storedToken) {
        return null;
      }
      const token = JSON.parse(storedToken as string);

      return token;
    },

    updateAccessToken: (token: string): void => {
      if (typeof Storage === 'undefined') return;
      token = JSON.stringify(token);
      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN_KEY, token);
    },

    isAuthenticated: () => {
      const accessToken = localStorageUtil.getAccessToken();

      if (!accessToken) return false;
      return true;
    },

    getPayloadFromToken: (token: string) => {
      if (!token) {
        return {};
      }

      return jwtDecode(token);
    },
  };
})();
export default localStorageUtil;
