const express =  require("express")
const bodyParsor =  require("body-parser")
const path = require("path")
const $ = require( "jquery" );
const route = express()
const port = 3000;
const db = require("./DataBase.js")
let jsonParsor = bodyParsor.json()
let urlencodedParser = bodyParsor.urlencoded({ extended: false })
require("./route.js")
route.set("view engine", "ejs")