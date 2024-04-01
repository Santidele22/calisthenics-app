//dependecies
import express from "express";
import morgan from "morgan";
//cors
import corsMiddleware from "./middleware/cors.js";
//routes
import exercize_router from "./routes/exercizes-routes.js";
import routine_router from "./routes/routine-routes.js";
import exercizeRoutine_router from "./routes/exercizes-routines.js";
const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(corsMiddleware);
app.use(morgan("dev"));
app.use(express.json());
app.use("/exercizes", exercize_router);
app.use("/routines", routine_router);
app.use("/exercizesRoutines", exercizeRoutine_router);

app.listen(PORT, () => {
  console.log(`server listening in port http://localhost:${PORT}`);
});
