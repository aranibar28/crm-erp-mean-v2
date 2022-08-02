const { Router } = require("express");
const { validateJWT } = require("../middlewares/authenticated");
const ctrl = require("../controllers/product");
const router = Router();

const multiparty = require("connect-multiparty");
const path = multiparty({ uploadDir: "./uploads/products" });

//[ http://localhost:3000/api/products ]
router.post("/create_product", [validateJWT, path], ctrl.create_product);

module.exports = router;
