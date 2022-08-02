const { Router } = require("express");
const { validateJWT } = require("../middlewares/authenticated");
const ctrl = require("../controllers/customer");
const router = Router();

//[ http://localhost:3000/api/customer ]
router.post("/create_customer", [validateJWT], ctrl.create_customer);
router.get("/read_customers/:filter?", [validateJWT], ctrl.read_customers);
router.get("/read_customer_by_id/:id", [validateJWT], ctrl.read_customer_by_id);
router.put("/update_customer/:id", [validateJWT], ctrl.update_customer);
router.delete("/delete_customer/:id", [validateJWT], ctrl.delete_customer);
router.put("/change_status/:id", [validateJWT], ctrl.change_status);
router.get("/confirm_email_verify/:token", ctrl.confirm_email_verify);
router.get("/image/:img", ctrl.image);
router.get("/list_customers/:filter?", [validateJWT], ctrl.list_customers);

/*
router.get("/generate_token/:inscription/:customer", ctrl.generate_token);
router.post("/send_survey", ctrl.send_survey);
router.get("/read_survey/:id", ctrl.read_survey);
*/

module.exports = router;
