import Cookies from "js-cookie";

export const cookieUtils = {
  setToken(token: string) {
    Cookies.set(process.env.TOKEN_KEY!, token, {
      expires: Number(process.env.TOKEN_EXPIRES!),
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  },

  getToken(): string | undefined {
    return Cookies.get(process.env.TOKEN_KEY!);
  },

  removeToken() {
    Cookies.remove(process.env.TOKEN_KEY!);
  },

  hasToken(): boolean {
    return !!this.getToken();
  },
};
