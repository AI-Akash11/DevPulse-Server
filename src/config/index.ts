import dotenv from "dotenv"
import path from "path"
import { env } from "process";

dotenv.config({
    path: path.join(process.cwd(),".env"),
    quiet: true
})


const config = {
    port: env.PORT,
    database_url: env.DATABASE_URL as string,
    node_env: env.NODE_ENV as string,
    site_url: env.SITE_URL,
    jwt_secret: env.JWT_SECRET as string,


}

export default config;