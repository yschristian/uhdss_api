const express = require("express")
const routerAgent = express()
const verifyToken = require('../middleware/verifyToken');
const agentSchema = require("../helper/validateAgent")
const validate =  require("../middleware/validateinput")
const agentController = require("../controllers/agentController")

routerAgent.post('/createAgent',verifyToken, agentController.createAgent);
routerAgent.post("/request",validate(agentSchema),agentController.agentRequest)
routerAgent.get("/allAgent",agentController.getAllAgentsRequest)
routerAgent.get("/agentone/:uuid",agentController.getAgent)
routerAgent.post("/approve/:uuid",agentController.approveAgent)
routerAgent.delete("/delete/:uuid",agentController.deleteAgent)

module.exports = routerAgent