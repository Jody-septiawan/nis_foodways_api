const express = require("express");

const router = express.Router();

const { auhtenticated } = require('../middlewares/auth');
const { checkRolePartner, checkRoleUser } = require('../middlewares/checkRole');

const {
    getUsers,
    // getUser,
    addUser,
    deleteUser,
} = require("../controllers/user");

const {
    register,
    login
} = require("../controllers/auth");

router.get("/users", auhtenticated, checkRolePartner, getUsers);
// router.get("/user/:id", getUser);
router.post("/user", addUser);
router.delete("/user/:id", deleteUser);

router.post("/register", register);
router.post("/login", login);

module.exports = router;