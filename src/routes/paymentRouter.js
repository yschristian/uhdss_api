const express = require("express")
const routerPayment = express()
const paymentController = require("../controllers/paymentController")


routerPayment.post('/pay-visa-appllication', paymentController.payVisaApplication)


module.exports = routerPayment