const { Router } = require("express");
const ctrl = require("../controllers/auth");
const router = Router();

//[ http://localhost:3000/api/auth/ ]
router.post("/login_collaborator", ctrl.login_collaborator);
router.post("/register_collaborator", ctrl.register_collaborator);
router.post("/login_customer", ctrl.login_customer);
router.post("/register_customer", ctrl.register_customer);

module.exports = router;
