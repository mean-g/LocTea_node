const express        = require("express");
const userController = require("../controller/userController");
const db             = require("../config/mysql");
const jwt            = require("../utils/jwt");
const router         = express.Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);

module.exports={
    router
}