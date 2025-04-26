import { Router } from "express";
import { register, login, getMe, logout } from "../controllers/auth.controllers.js"
import { registerUserValidater, loginValidator } from "../utils/validator.js"
import { isValidPayload } from "../middleware/validate.middleware.js"
import isAuthenticated from '../middleware/isAuthenticated.middleware.js'
const router = Router();

router.post('/register', registerUserValidater(), isValidPayload, register)
router.post('/login', loginValidator(), isValidPayload, login)
router.get('/getMe', isAuthenticated, getMe);
router.get('/logout', isAuthenticated, logout);
export default router;