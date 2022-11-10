import express from "express";
import "./database/connection";
import institutionsRoute from "./routes/institutions";
import path from "path";
import errorHandler from "./errors/handler";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/institutions", institutionsRoute);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);

app.listen(3333, () => console.log("✅ listening at port 3333"));
