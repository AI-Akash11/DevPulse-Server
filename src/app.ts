import express, { type Application, type Request, type Response } from "express"
import { logger } from "./middleware/logger";
import globalErrorHandler from "./middleware/globalErrorHandler";
import cors from "cors";
import config from "./config";

const app : Application = express();


// Middlewares Here ---------->
app.use(express.json());
app.use(logger)

const corsOptions = {
  origin: config.site_url,
}
app.use(cors(corsOptions));



// Api's here --------------->

app.get('/', (req : Request, res : Response) => {
  res.status(200).json({
    message: "express server is on"
  })
})

app.use(globalErrorHandler)

export default app