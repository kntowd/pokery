const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080

app.use(cors())

app.get('/', (req, res) => {
  res.json({title: 'pokery!!!'})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
