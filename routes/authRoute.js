const express = require("express");
const route = express.Router();
const authController = require("../controllers/authController");

const { body,check } = require("express-validator");

route.get("/signup", authController.getSignup);

route.post("/signup", authController.postSignup);

route.get("/login", authController.getLogin);

route.post("/login",
[
    check('email')
    .isEmail()
    .trim()
    .withMessage("This email is invalid"),
    body('password', "Incorrect Password, Should have minimun 6 charcters")
    .isLength({min : 6})
    .trim()
]
,authController.postLogin);

route.get("/logout", authController.getLogout);

module.exports = route;