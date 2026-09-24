import express from "express"
import config from "./config"

const app = express()
const port = config.url

app.get('/', (req, res) => {
  res.send('Dev Pulse Server is on')
})

app.listen(port, () => {
  console.log(`Dev Pulse is listening on port ${port}`)
})