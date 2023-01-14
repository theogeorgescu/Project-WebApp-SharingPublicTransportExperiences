import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import { sequelize } from "./sequelize.js";

import {userRouter} from "./routes/routes.js"

import { User } from "./models/user.js";
import { Feedback } from "./models/feedback.js";

const router = require("./routes/routes");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

app.listen(3000, () => {
    console.log('server started on port 3000');
})