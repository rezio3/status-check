import { Router } from "express";
import {
  addCar,
  getUserCars,
  getPublicCarByPlate,
} from "../controllers/carController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateToken, addCar);
router.get("/my-cars", authenticateToken, getUserCars);

router.get("/public/:plateNumber", getPublicCarByPlate);

export default router;
