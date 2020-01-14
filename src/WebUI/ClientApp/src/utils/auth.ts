interface Auth {
  accessToken: string | null;
  readonly refreshToken: string | null;
}

const auth: Auth = {
  accessToken: null,
  refreshToken: localStorage.getItem('refresh_token'),
};

export default auth;
