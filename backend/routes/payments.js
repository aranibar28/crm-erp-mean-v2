const { Router } = require("express");
const { validateJWT } = require("../middlewares/authenticated");
const ctrl = require("../controllers/payments");
const router = Router();

//[ http://localhost:3000/api/payments ]
router.get("/read_inscription_payments/:id", [validateJWT], ctrl.read_inscription_payments);
router.post("/create_inscription_payment", [validateJWT], ctrl.create_inscription_payment);

module.exports = router;
