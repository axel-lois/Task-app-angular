const express = require("express");
const {
  createUser,
  userProfile,
  login,
  logout,
} = require("../controllers/user");
const userRouter = express.Router();

userRouter.post("/login",login);
userRouter.post("/signup", createUser);
userRouter.get("/profile",userProfile);
// userRouter.post("/logout",logout);

module.exports = userRouter;
