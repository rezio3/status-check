import { Request, Response } from "express";
import { auth, db } from "../config/firebase";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email i hasło są wymagane." });
    }

    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name || "",
    });

    await db
      .collection("users")
      .doc(userRecord.uid)
      .set({
        email: userRecord.email,
        name: name || "",
        createdAt: new Date(),
        role: "user",
      });

    res.status(201).json({
      message: "Użytkownik zarejestrowany pomyślnie!",
      userId: userRecord.uid,
    });
  } catch (error: any) {
    console.error("Błąd rejestracji:", error);
    res
      .status(400)
      .json({ error: error.message || "Błąd podczas rejestracji." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email i hasło są wymagane." });
    }

    const apiKey = process.env.FIREBASE_WEB_API_KEY;

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({ error: "Nieprawidłowy email lub hasło." });
    }

    const userRecord = await auth.getUser(data.localId);

    const secret = process.env.JWT_SECRET || "default_secret";
    const token = jwt.sign(
      { uid: userRecord.uid, email: userRecord.email },
      secret,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Zalogowano pomyślnie!",
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName,
      },
    });
  } catch (error: any) {
    console.error("Błąd logowania:", error);
    res.status(500).json({ error: "Błąd serwera podczas logowania." });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Wylogowano pomyślnie." });
};

export const getMe = (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const secret = process.env.JWT_SECRET || "default_secret";
    const decoded = jwt.verify(token, secret) as { uid: string; email: string };

    res.json({
      authenticated: true,
      user: {
        uid: decoded.uid,
        email: decoded.email,
      },
    });
  } catch (error) {
    res.status(401).json({ authenticated: false });
  }
};
