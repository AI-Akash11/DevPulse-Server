import express, { type Application, type Request, type Response } from "express"
import { logger } from "./middleware/logger";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app : Application = express();


// Middlewares Here ---------->
app.use(logger)

app.get('/', (req : Request, res : Response) => {
  throw new Error("koi jaba mamu")
  res.send('Dev Pulse Server is on')
})

app.use(globalErrorHandler)

export default app