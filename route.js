const express =  require("express")
const bodyParsor =  require("body-parser")
const { allEmployees, index, create, store, edit, update, destroy } = require("./contollers/EmployeeController.js")
const route = express()
const port = 3000;
let jsonParsor = bodyParsor.json()
let urlencodedParser = bodyParsor.urlencoded({ extended: false })

route.set("view engine", "ejs")

route.get('/', allEmployees)

route.get('/give/employees', index)

route.get('/employee/create', create)

route.post('/store', urlencodedParser, store)

route.get('/update/:id', urlencodedParser, edit)

route.post('/update/:id', urlencodedParser, update)

route.get('/delete/:id', destroy)

route.listen(port, (err) => {
    err ? console.log("error has occurred!!!!") : console.log(`your app is listning on ${port}`)
})

