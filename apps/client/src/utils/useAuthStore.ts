import { ref, readonly } from 'vue';
import Cookies from 'js-cookie';
import { checkGitHubToken } from '../service/auth';

export const USER_INFO_KEY = 'user_info';

export const setCookie = (key: string, value: string) => {
  Cookies.set(key, value, {
    expires: 7, // 7天后过期
    secure: false, // 只在 HTTPS 连接中传输
    sameSite: 'strict', // 防止 CSRF 攻击
  });
};

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};

export const isAuthenticated = async () => {
  const userInfo = getCookie(USER_INFO_KEY);
  if (userInfo) {
    return await checkGitHubToken(JSON.parse(userInfo).access_token);
  }
  return false;
};

export const createAuthStore = () => {
  const isAuth = ref(false);
  const userInfo = ref<{ avatar_url: string; login: string }>({
    avatar_url: '',
    login: '',
  });

  const checkAuthStatus = async () => {
    isAuth.value = await isAuthenticated();
    if (isAuth.value) {
      userInfo.value = JSON.parse(getCookie('user_info') || '{}');
    }
  };

  const updateAuth = async (data: any) => {
    setCookie(USER_INFO_KEY, JSON.stringify(data));
    isAuth.value = true;
    userInfo.value = data;
  };

  const clearAuth = () => {
    removeCookie(USER_INFO_KEY);
    isAuth.value = false;
    userInfo.value = { avatar_url: '', login: '' };
  };

  return {
    isAuth: readonly(isAuth),
    userInfo: readonly(userInfo),
    updateAuth,
    clearAuth,
    checkAuthStatus,
  };
};

export type AuthStore = ReturnType<typeof createAuthStore>;
