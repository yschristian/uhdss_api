const express = require("express")
const universtyController = require("../controllers/universityController")
const universityRouter = express()

universityRouter.post("/create",universtyController.createUniversity)
universityRouter.get("/all",universtyController.getAllUniversity)
universityRouter.get("/one/:uuid",universtyController.getOneuniversity)
universityRouter.put("/update/:uuid",universtyController.updateUniversity)
universityRouter.delete("/delete/:uuid",universtyController.deleteUniversity)
module.exports = universityRouter