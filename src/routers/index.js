const express = require("express");

const router = express.Router();

const {
    getUsers,
    // getUser,
    addUser,
    deleteUser,
} = require("../controllers/user");

const {
    register
} = require("../controllers/auth");

router.get("/users", getUsers);
// router.get("/user/:id", getUser);
router.post("/user", addUser);
router.delete("/user/:id", deleteUser);

router.post("/register", register);

module.exports = router;