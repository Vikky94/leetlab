import jsonwebtoken from 'jsonwebtoken'
import { ApiError } from '../utils/api-error.js';
import { db } from '../db/index.js';

const isAuthenticated = async function (req, res, next) {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) throw new ApiError(401, "Unauthorized");

    try {
        const decodedData = jsonwebtoken.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
        const isUserExist = await db.user.findUnique({
            where: {
                id: decodedData.id
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                image: true,
                role: true
            }
        })
        if (!isUserExist)
            throw new ApiError(404, "User not found");

        req.user = isUserExist;
        console.log('User isAuthenticated true')
        next();

    } catch (err) {
        const errorMsg = err.message ?? "Not authorized, token failed";
        throw new ApiError(401, errorMsg, { message: errorMsg });
    }

}

export default isAuthenticated