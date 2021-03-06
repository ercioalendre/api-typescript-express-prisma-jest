export const jwt = {
  secret: process.env.APP_AUTH_SECRET || "3ef42d1353b256c8c1bd8120028c185c",
  expiresIn: "1d",
};

export interface ITokenPayLoad {
  iat: number;
  ext: number;
  sub: string;
  name: string;
  type: string;
}
