const express = require('express');
const cors = require('cors');
const{ sequelize } = require('./src/models');
const studentRouter = require('./src/routes/userRouter');
const routerDetails = require('./src/routes/detailsRouter');
const profileRouter = require('./src/routes/profileRouter');
const agentRouter = require('./src/routes/agentRouter');
const routerInstutite = require('./src/routes/instituteRouter');
const notRouter = require("./src/routes/notificRouter");
const paymentRouter = require("./src/routes/paymentRouter");
const notificRouter = require("./src/routes/notificRouter");
const routerMessage = require("./src/routes/messageRouter");
const universityRouter = require("./src/routes/universtiyRouter");
const visaRouter = require("./src/routes/visaRouter")


const app = express();

const port =  process.env.port || 5000;

app.use(express.json());
app.use(cors({origin: "*"}));

app.use("/details",routerDetails)
app.use("/student", studentRouter)
app.use("/profile",profileRouter)
app.use("/agent",agentRouter)
app.use("/institution",routerInstutite)
app.use("/notification",notRouter)
app.use("/payment", paymentRouter)
app.use("/message",routerMessage)
app.use("/visa",visaRouter)


app.listen(port, async() =>{
    console.log(`Server listening at http://localhost:${port}`);
    await sequelize.authenticate()
    console.log("database connected successfully !");
})
