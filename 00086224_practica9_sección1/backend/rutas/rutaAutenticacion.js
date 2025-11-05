
import controladorAut from '../controllers/controladorAutenticacion.js';
import { Router } from "express";

const router = Router();

router.post("/signin", controladorAut.signin);
router.post("/signup", controladorAut.signup);

export default router