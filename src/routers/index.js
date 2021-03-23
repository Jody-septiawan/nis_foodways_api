const express = require("express");

const router = express.Router();

const { auhtenticated } = require('../middlewares/auth');
const {
    checkRolePartner,
    checkRoleUser,
    checkRoleAdmin
} = require('../middlewares/checkRole');
const { uploadFileUser } = require('../middlewares/uploadUser');
const { uploadFileProduct } = require('../middlewares/uploadProduct');

const {
    getUsers,
    deleteUser,
    editUser
} = require("../controllers/user");

const {
    register,
    login
} = require("../controllers/auth");

const {
    getProducts,
    addProduct,
    getProductsPartner,
    getDetailProduct,
    deleteProduct,
    editProduct
} = require("../controllers/partner");

const { addTransaction } = require("../controllers/transaction");

// Auth
router.post("/login", login);
router.post("/register", uploadFileUser("imageFile"), register);

//  Admin
router.get("/users", auhtenticated, checkRoleAdmin, getUsers);
router.delete("/user/:id", auhtenticated, checkRoleAdmin, deleteUser);

//  User & Partner
router.patch("/user", auhtenticated, uploadFileUser("imageFile"), editUser);

// Product
router.post("/product", auhtenticated, checkRolePartner, uploadFileProduct("imageFile"), addProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductsPartner);
router.get("/product/:id", getDetailProduct);
router.delete("/product/:id", auhtenticated, deleteProduct);
router.patch("/product/:id", auhtenticated, uploadFileProduct("imageFile"), editProduct);

// transaction
router.post("/transaction", auhtenticated, checkRoleUser, addTransaction);


module.exports = router;