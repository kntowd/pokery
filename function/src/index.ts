const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080
import { Request, Response } from 'express'

app.use(cors())

app.get('/api/title', (_req: Request, res: Response) => {
  res.json({title: 'pokery!!!'})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
