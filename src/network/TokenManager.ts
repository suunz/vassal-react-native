let accessToken: string | null = null;

export const TokenManager = {
  setToken(token: string | null) {
    accessToken = token;
  },

  getToken(): string | null {
    return accessToken;
  },

  clearToken() {
    accessToken = null;
  },
};
