import jsonwebtoken from "jsonwebtoken";

const generateAccessToken = function (payload) {
  const accessToken = jsonwebtoken.sign(
    payload,
    process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED_IN,
    },
  );
  return accessToken;
};
const generateRefreshToken = function (payload) {
  const refreshToken = jsonwebtoken.sign(
    payload,
    process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED_IN,
    },
  );
  return refreshToken;
};

export { generateAccessToken, generateRefreshToken };
