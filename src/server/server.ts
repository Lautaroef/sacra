import express from "express";
import path from "path";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// Telling express to use the uploads folder as a static folder
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
