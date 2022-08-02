const { Router } = require("express");
const { validateJWT } = require("../middlewares/authenticated");
const ctrl = require("../controllers/inscription");
const router = Router();

//[ http://localhost:3000/api/inscription ]
router.post("/create_inscription", [validateJWT], ctrl.create_inscription);
router.get("/read_inscriptions_today", [validateJWT], ctrl.read_inscriptions_today);
router.get("/read_inscriptions_dates/:advisor/:from?/:to?", [validateJWT], ctrl.read_inscriptions_dates);
router.get("/read_inscription_by_id/:id", [validateJWT], ctrl.read_inscription_by_id);
router.get("/send_invoice/:id", [validateJWT], ctrl.send_invoice);
router.put("/firm_inscription/:id", [validateJWT], ctrl.firm_inscription);
router.get("/cancel_inscription/:id", [validateJWT], ctrl.cancel_inscription);
router.get("/list_comments/:id", [validateJWT], ctrl.list_comments);

module.exports = router;
