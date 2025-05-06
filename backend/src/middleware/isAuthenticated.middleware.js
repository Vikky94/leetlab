import jsonwebtoken from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";
import { db } from "../db/index.js";

export const isAuthenticated = async function (req, res, next) {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) throw new ApiError(401, "Unauthorized");

  try {
    const decodedData = jsonwebtoken.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    );
    const isUserExist = await db.user.findUnique({
      where: {
        id: decodedData.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        image: true,
        role: true,
      },
    });
    if (!isUserExist) throw new ApiError(404, "User not found");

    req.user = isUserExist;
    console.log("User isAuthenticated true");
    next();
  } catch (err) {
    const errorMsg = err.message ?? "Not authorized, token failed";
    throw new ApiError(401, errorMsg, { message: errorMsg });
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });
    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Access denied - Admins only",
      });
    }
    next();
  } catch (error) {
    console.error("Error checking admin role:", error);
    res.status(500).json({ message: "Error checking admin role" });
  }
};
