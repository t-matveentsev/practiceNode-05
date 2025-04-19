import express from "express";
import cors from "cors";

import moviesRouter from "./routers/movies.js";

import { getEnvVar } from "./utils/getEnvVar.js";
import { logger } from "./middlewares/logger.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export const startServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(logger);

  app.use("/movies", moviesRouter);

  app.use("*", notFoundHandler);
  app.use(errorHandler);

  const port = Number(getEnvVar("PORT", 3000));
  app.listen(port, () => console.log(`Server running on ${port} port`));
};
