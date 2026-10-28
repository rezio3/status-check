import { Router } from "express";
import {
  addCar,
  getUserCars,
  getPublicCarByPlate,
  updateCarStatus,
} from "../controllers/carController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateToken, addCar);
router.patch("/:carId/status", authenticateToken, updateCarStatus);
router.get("/my-cars", authenticateToken, getUserCars);

router.get("/public/:plateNumber", getPublicCarByPlate);

export default router;
