import { Response } from "express";
import { db } from "../config/firebase";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { CarStatus } from "../types/carTypes";

export const addCar = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.uid;
    const { plateNumber, brand, model, year, vin, phone } = req.body;

    if (!plateNumber) {
      return res
        .status(400)
        .json({ error: "Numer rejestracyjny jest wymagany." });
    }

    if (!userId) {
      return res
        .status(401)
        .json({ error: "Brak identyfikatora użytkownika." });
    }

    const formattedPlate = plateNumber.toUpperCase().trim();

    const carsRef = await db.collection("users").doc(userId).collection("cars");

    const lastQueuedCar = await carsRef
      .where("status", "==", CarStatus.Queued)
      .orderBy("order", "desc")
      .limit(1)
      .get();

    const lastOrder = lastQueuedCar.empty
      ? 0
      : (lastQueuedCar.docs[0].data().order ?? 0);

    const newOrder = lastOrder + 1;

    const carRef = await carsRef.add({
      plateNumber: formattedPlate,
      brand,
      model,
      year,
      vin,
      phone,
      status: CarStatus.Queued,
      order: newOrder,
      createdAt: new Date(),
    });

    return res.status(201).json({
      message: "Auto dodane pomyślnie!",
      car: {
        id: carRef.id,
        plateNumber: formattedPlate,
        status: CarStatus.Queued,
        order: newOrder,
      },
    });
  } catch (error: any) {
    console.error("Błąd dodawania auta:", error);
    return res
      .status(500)
      .json({ error: "Błąd serwera podczas dodawania auta." });
  }
};

export const getUserCars = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.uid;

    if (!userId) {
      return res
        .status(401)
        .json({ error: "Brak identyfikatora użytkownika." });
    }

    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("cars")
      .orderBy("createdAt", "desc")
      .get();

    const cars = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(cars);
  } catch (error: any) {
    console.error("Błąd pobierania aut:", error);
    res.status(500).json({ error: "Błąd serwera podczas pobierania aut." });
  }
};

export const getPublicCarByPlate = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const { plateNumber } = req.params;

    if (!plateNumber) {
      return res.status(400).json({ error: "Podaj numer rejestracyjny." });
    }

    const formattedPlate = plateNumber.toUpperCase().trim();

    const snapshot = await db
      .collectionGroup("cars")
      .where("plateNumber", "==", formattedPlate)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res
        .status(404)
        .json({ error: "Nie znaleziono pojazdu o podanej rejestracji." });
    }

    const carData = snapshot.docs[0].data();

    res.json({
      plateNumber: carData.plateNumber,
      vin: carData.vin,
    });
  } catch (error: any) {
    console.error("Błąd wyszukiwania publicznego:", error);
    res.status(500).json({ error: "Błąd serwera podczas wyszukiwania." });
  }
};
