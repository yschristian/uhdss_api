const express = require("express")
const {filesName} = require("../utils/multer")
const visaController = require("../controllers/visaController")

const visaRouter = express()

visaRouter.post("/create",visaController.createVisa);
visaRouter.get("/all",visaController.getAllVisa);
visaRouter.post("/uploadFile", filesName.fields([{name: "file",maxCount:1}]), visaController.uploadFile)
visaRouter.get("/:uuid",visaController.getVisaById);
visaRouter.delete("/delete/:uuid",visaController.deleteVisa);
visaRouter.put("/update/:uuid",visaController.updateVisa)

module.exports = visaRouter