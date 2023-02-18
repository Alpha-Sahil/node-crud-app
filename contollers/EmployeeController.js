const db = require("../DataBase.js")

const allEmployees = (req, res) => {
    db.query(`SELECT * FROM employees`, (err, employees) => {
        err ? console.log('errror occured') : res.render('index', { employees : employees })   
    })
}

const index = (req, res) => {
    db.query(`SELECT * FROM employees`, (err, employees) => {
        err ? console.log('errror occured') : res.send(employees)      
    })
}

const create = (req, res) => {
    res.render('create')
}

const store = (req, res)  => {
    db.query(`INSERT INTO employees(name, email) VALUES('${req.body.name}', '${req.body.email}')`, (err, result) => {
        err ? console.log('error occured') : console.log('data inserted !!')
    })

    res.redirect('../')
}

const edit = (req, res)  => {
    db.query(`SELECT * from employees WHERE id = '${req.params.id}'`,  (err, result) => {
        err ? res.send(500) : res.render('edit', {employee : result})
    })
}
 
const update = (req, res) => {
    db.query(`UPDATE employees SET name = '${req.body.name}', email ='${req.body.email}' WHERE id = '${req.params.id}'`,  (err, result) => {
        err ? res.send(500) : res.redirect('../')
    })
}

const destroy = (req, res) => {
    db.query(`DELETE FROM employees WHERE id = '${req.params.id}'`, (err, result) => {
        err ? res.send(500) : res.redirect('../')
    })
}

module.exports = { allEmployees, index, create, store, edit, update, destroy }