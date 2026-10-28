import { Response } from "express";
import { db } from "../config/firebase";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { CarStatus, isCarStatus } from "../types/carTypes";

export const addCar = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.uid;
    const { plateNumber, brand, model, year, vin, phone } = req.body;

    if (!plateNumber) {
      return res.status(400).json({
        error: "Numer rejestracyjny jest wymagany.",
      });
    }

    if (!userId) {
      return res.status(401).json({
        error: "Brak identyfikatora użytkownika.",
      });
    }

    const formattedPlate = plateNumber.toUpperCase().trim();
    const carsRef = db.collection("users").doc(userId).collection("cars");

    const snapshot = await carsRef.get();

    const carsWithOrder = snapshot.docs
      .filter((doc) => {
        const order = doc.data().order;
        return order !== null && order !== undefined;
      })
      .sort((a, b) => {
        return a.data().order - b.data().order;
      });

    const batch = db.batch();

    carsWithOrder.forEach((doc, index) => {
      batch.update(doc.ref, {
        order: index + 1,
      });
    });

    const newOrder = carsWithOrder.length + 1;
    const carRef = carsRef.doc();

    batch.set(carRef, {
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

    await batch.commit();

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

    return res.status(500).json({
      error: "Błąd serwera podczas dodawania auta.",
    });
  }
};

export const updateCarStatus = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user?.uid;
    const { carId } = req.params;
    const { status } = req.body;

    if (!userId) {
      return res.status(401).json({
        error: "Brak identyfikatora użytkownika.",
      });
    }

    if (!carId) {
      return res.status(400).json({
        error: "Brak identyfikatora pojazdu.",
      });
    }

    if (!isCarStatus(status)) {
      return res.status(400).json({
        error: "Nieprawidłowy status pojazdu.",
        allowedStatuses: Object.values(CarStatus),
      });
    }

    const carsRef = db.collection("users").doc(userId).collection("cars");

    const carRef = carsRef.doc(carId);

    const updatedCar = await db.runTransaction(async (transaction) => {
      // Pobieramy wszystkie auta w ramach transakcji,
      // aby prawidłowo przeliczyć kolejkę.
      const snapshot = await transaction.get(carsRef);

      const carDoc = snapshot.docs.find((doc) => doc.id === carId);

      if (!carDoc) {
        throw new Error("CAR_NOT_FOUND");
      }

      const currentCar = carDoc.data();
      const currentStatus = currentCar.status;

      const queuedCars = snapshot.docs
        .filter((doc) => {
          const data = doc.data();

          return (
            data.status === CarStatus.Queued &&
            data.order !== null &&
            data.order !== undefined &&
            doc.id !== carId
          );
        })
        .sort((a, b) => {
          return a.data().order - b.data().order;
        });

      if (status === CarStatus.Queued) {
        // Jeżeli auto wraca do kolejki, trafia na jej koniec.
        const newQueue = [...queuedCars, carDoc];

        newQueue.forEach((doc, index) => {
          transaction.update(doc.ref, {
            status: CarStatus.Queued,
            order: index + 1,
          });
        });
      } else {
        // Auto opuszcza kolejkę — nie ma już numeru.
        transaction.update(carRef, {
          status,
          order: null,
        });

        // Przeliczamy kolejkę pozostałych aut.
        queuedCars.forEach((doc, index) => {
          transaction.update(doc.ref, {
            order: index + 1,
          });
        });
      }

      return {
        id: carId,
        plateNumber: currentCar.plateNumber,
        status,
        order: status === CarStatus.Queued ? queuedCars.length + 1 : null,
      };
    });

    return res.status(200).json({
      message: "Status pojazdu został zmieniony.",
      car: updatedCar,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "CAR_NOT_FOUND") {
      return res.status(404).json({
        error: "Nie znaleziono pojazdu.",
      });
    }

    console.error("Błąd zmiany statusu pojazdu:", error);

    return res.status(500).json({
      error: "Błąd serwera podczas zmiany statusu.",
    });
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
