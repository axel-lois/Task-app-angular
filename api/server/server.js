const express = require("express");
const morgan = require("morgan");
const { db } = require("../models/index");
const server = express();
const PORT = 3001 || process.env.PORT;
const taskRouter = require("../routes/task");
const userRouter = require("../routes/user");
const fillScript = require("../utils/script");
const cors = require('cors');

//middleware
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan("dev"));
server.use(cors());

server.use("/api", taskRouter);
server.use("/api", userRouter);

//sync db and server
db.sequelize.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    await fillScript()
    console.log(`Running server on port ${PORT}`);
  });
});
