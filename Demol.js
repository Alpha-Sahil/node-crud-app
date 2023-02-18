const express = require('express')
const connection = require('./Database.js')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  connection.query('select * from just_for_testing', (err, row) => {
    err ? console.log(`Unable to retrieve the data ${err}`) : console.log(row)
  })
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
