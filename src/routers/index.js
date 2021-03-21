const express = require("express");

const router = express.Router();

const { auhtenticated } = require('../middlewares/auth');
const { checkRolePartner, checkRoleUser, checkRoleAdmin } = require('../middlewares/checkRole');
const { uploadFile } = require('../middlewares/upload');

const {
    getUsers,
    deleteUser,
    editUser
} = require("../controllers/user");

const {
    register,
    login
} = require("../controllers/auth");

// Untuk Admin
router.get("/users", auhtenticated, checkRoleAdmin, getUsers);
router.delete("/user/:id", auhtenticated, checkRoleAdmin, deleteUser);

// Untuk User/Partner
router.post("/login", login);
router.post("/register", register);
router.patch("/edit-user", auhtenticated, checkRoleUser, uploadFile("imageFile"), editUser);

module.exports = router;