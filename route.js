const express =  require("express")
const bodyParsor =  require("body-parser")
const path = require("path")
const $ = require( "jquery" );
const route = express()
const port = 3000;
const db = require("./DataBase.js")
route.set("view engine", "ejs")

let jsonParsor = bodyParsor.json()
let urlencodedParser = bodyParsor.urlencoded({ extended: false })

route.get('/', (req, res) => {
    let employees = db.query(`SELECT * FROM employees`, (err, row) => {
        err ? console.log('unable to load data') : console.log('loaded')
    })

    res.render('index', {employees: employees})
})

route.get('/employee/create', (req, res) => {
    res.render('create')
})

route.get('/give/employees', (req, res) => {
    let employees = []
    db.query(`SELECT * FROM employees`, (err, row) => {
        err ? console.log('errror occured') : employees = row
        res.send(employees)
    })
})

route.post('/store', urlencodedParser, (req, res) => {
    let name = req.body.name
    let email = req.body.email
    
    db.query(`INSERT INTO employees(name, email) VALUES('${name}', '${email}')`, (err, result) => {
        err ? console.log('error occured') : console.log('data inserted !!')
    })

    res.redirect('../')
})

route.get('/update/:id', urlencodedParser, (req, res) => {   
    db.query(`SELECT * from employees WHERE id = '${req.params.id}'`,  (err, result) => {
        console.log(result)
        err ? res.send(500) : res.render('edit', {employee : result})
        // err ? res.send(500) : res.render(result)
    })
})

route.post('/update/:id', urlencodedParser, (req, res) => {  
     
    db.query(`UPDATE employees SET name = '${req.body.name}', email ='${req.body.email}' WHERE id = '${req.params.id}'`,  (err, result) => {
        console.log(result)
        console.log(err)
        err ? res.send(500) : res.redirect('../')
        // err ? res.send(500) : res.render(result)
    })
})

route.get('/delete/:id', (req, res) => {
    db.query(`DELETE FROM employees WHERE id = '${req.params.id}'`, (err, result) => {
        err ? res.send(500) : res.redirect('../')
    })
})

route.listen(port, (err) => {
    err ? console.log("error has occurred!!!!") : console.log(`your app is listning on ${port}`)
})

