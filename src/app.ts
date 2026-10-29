import express, { type Application, type Request, type Response } from "express"
import { logger } from "./middleware/logger";
import globalErrorHandler from "./middleware/globalErrorHandler";
import cors from "cors";
import config from "./config";
import { authRoute } from "./modules/auth/auth.route";
import { issueRoute } from "./modules/issue/issue.route";

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


app.use('/api/auth', authRoute);

app.use('/api/issues', issueRoute)


app.use(globalErrorHandler)

export default app