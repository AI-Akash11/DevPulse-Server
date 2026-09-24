import express from "express"

const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Dev Pulse Server is on')
})

app.listen(port, () => {
  console.log(`Dev Pulse is listening on port ${port}`)
})