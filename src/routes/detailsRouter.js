const express = require("express")
const verifyToken = require('../middleware/verifyToken');
const {filesName} = require("../utils/multer");
const detailsController = require("../controllers/detailsController");
const routerDetails = express();

routerDetails.post("/create",verifyToken, detailsController.createDetail)
routerDetails.post("/uploadFile", filesName.fields([{name: "file",maxCount:1}]), detailsController.uploadFile)
routerDetails.get("/getAll",detailsController.getAllDetails)
routerDetails.get("/getByuser/:uuid", detailsController.userDetails)
routerDetails.get("/get/:uuid",detailsController.getDetails)
routerDetails.put("/admitReject/:uuid", detailsController.AdmitRejectDetail)
routerDetails.get("/search",detailsController.search)
routerDetails.delete("/delete/:uuid",detailsController.detleteDetails)

module.exports = routerDetails