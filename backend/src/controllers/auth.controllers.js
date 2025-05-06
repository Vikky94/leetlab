import { asyncHandler } from "../utils/async-handler.js";
import { db } from "../db/index.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

const register = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  const isUserAlreadyExist = await db.user.findFirst({
    where: {
      OR: [{ email: email }, { username: username }],
    },
  });
  if (isUserAlreadyExist) {
    console.log("User already exist");
    console.log(isUserAlreadyExist);
    const recordAlreadyExistFor =
      isUserAlreadyExist.email === email ? "Email" : "Username";
    throw new ApiError(409, `${recordAlreadyExistFor} already exist`);
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  const isUserRegistered = await db.user.create({
    data: { email, password: encryptedPassword, username },
  });
  console.log("Registred user " + isUserRegistered);
  res.status(201).json(new ApiResponse(201, "User registered successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const isUserExist = await db.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
  if (!isUserExist) throw new ApiError(404, "User not found");

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password,
  );
  if (!isPasswordMatched) throw new ApiError(401, "Invalid credentials");

  const userObj = {
    id: isUserExist.id,
    firstName: isUserExist.firstName,
    lastName: isUserExist.lastName,
    username: isUserExist.username,
    email: isUserExist.email,
  };
  const accessToken = generateAccessToken(userObj);
  const refreshToken = generateRefreshToken({ id: isUserExist.id });

  res.cookie("accessToken", accessToken, {
    httpOnly: true, // Cannot be accessed from JS
    secure: true, // Only over HTTPS
    sameSite: "strict", // Prevent CSRF
    maxAge: process.env.JWT_ACCESS_TOKEN_EXPIRED_IN, //10mins
  });
  res.cookie("refreshToken", accessToken, {
    httpOnly: true, // Cannot be accessed from JS
    secure: true, // Only over HTTPS
    sameSite: "strict", // Prevent CSRF
    maxAge: process.env.JWT_REFRESH_TOKEN_EXPIRED_IN, //1Day
  });

  console.log("accessToken " + accessToken);
  console.log("refreshToken " + refreshToken);
  res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          id: isUserExist.id,
          name: isUserExist.name,
          email: isUserExist.email,
          role: isUserExist.role,
        },
      },
      "Logged in successfully",
    ),
  );
});

const getMe = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, { user: req.user }, "User getMe successfully"));
});
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { message: "Logged out successfully" },
        "Logged out successfully",
      ),
    );
});

export { register, login, getMe, logout };
