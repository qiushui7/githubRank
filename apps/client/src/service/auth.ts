import Cookies from 'js-cookie';
import axios from 'axios';

const TOKEN_KEY = 'github_token';

export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { 
    expires: 7, // 7天后过期
    secure: true, // 只在 HTTPS 连接中传输
    sameSite: 'strict' // 防止 CSRF 攻击
  });
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const isAuthenticated = async() => {
  const token=getToken()
  if(token){
    return await checkGitHubToken(token)
  }
  removeToken()
  return false
};

export const checkGitHubToken = async (token: string) => {
    try {
        const response = await axios.get('https://api.github.com/user', {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        return response.status === 200;
      } catch (error) {
        return false;
      }
};
