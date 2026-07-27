import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
