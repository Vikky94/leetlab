import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.middleware.js";
import { addProblemToPlaylist, createPlaylist, deletePlaylist, getAllListDetails, getPlayListDetails, removeProblemFromPlaylist } from "../controllers/playlist.controller.js";
const playlistRoutes = express.Router()
playlistRoutes.get("/", isAuthenticated, getAllListDetails);
playlistRoutes.get("/:playlistId", isAuthenticated, getPlayListDetails);
playlistRoutes.post("/create-playlist", isAuthenticated, createPlaylist);
playlistRoutes.post("/:playlistId/add-problem", isAuthenticated, addProblemToPlaylist);
playlistRoutes.delete("/:playlistId", isAuthenticated, deletePlaylist);
playlistRoutes.delete("/:playlistId/remove-problem", isAuthenticated, removeProblemFromPlaylist)
export default playlistRoutes;