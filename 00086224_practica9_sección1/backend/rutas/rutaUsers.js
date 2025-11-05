
import { verifyToken } from "../middleware/token.js"
import controlador from '../controllers/controladorUsers.js';
import { Router } from "express";

const router = Router();

router.get("/", verifyToken, controlador.displayHome);
router.get("/users", verifyToken, controlador.getUsers);
router.get("/users/:id", verifyToken, controlador.getUsersById);
router.put("/users/:id", verifyToken, controlador.updateUser);
router.delete("/users/:id", verifyToken, controlador.deleteUser);

router.get("/protected", verifyToken, (req, res) => {
    res.status(200).json({ message: "Protected data accessed", user: req.user });
});

export default router;