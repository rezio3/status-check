import { Response } from "express";
import { db } from "../config/firebase";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export const addCar = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.uid;
    const { plateNumber } = req.body;

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

    const carRef = await db
      .collection("users")
      .doc(userId)
      .collection("cars")
      .add({
        plateNumber: formattedPlate,
        vin: `VIN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        ownerName: "Jan Kowalski",
        createdAt: new Date(),
      });

    res.status(201).json({
      message: "Auto dodane pomyślnie!",
      car: {
        id: carRef.id,
        plateNumber: formattedPlate,
      },
    });
  } catch (error: any) {
    console.error("Błąd dodawania auta:", error);
    res.status(500).json({ error: "Błąd serwera podczas dodawania auta." });
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
