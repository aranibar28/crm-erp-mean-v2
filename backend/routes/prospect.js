const { Router } = require("express");
const { validateJWT } = require("../middlewares/authenticated");
const ctrl = require("../controllers/prospect");
const router = Router();

//[ http://localhost:3000/api/prospect ]
router.post("/create_call", [validateJWT], ctrl.create_call);
router.get("/read_calls/:id", [validateJWT], ctrl.read_calls);
router.delete("/delete_call/:id", [validateJWT], ctrl.delete_call);

router.post("/create_mail", [validateJWT], ctrl.create_mail);
router.get("/read_mails/:id", [validateJWT], ctrl.read_mails);
router.delete("/delete_mail/:id", [validateJWT], ctrl.delete_mail);

router.post("/create_task", [validateJWT], ctrl.create_task);
router.get("/read_tasks/:id", [validateJWT], ctrl.read_tasks);
router.delete("/delete_task/:id", [validateJWT], ctrl.delete_task);
router.put("/make_task/:id", [validateJWT], ctrl.make_task);

router.get("/list_activities/:id", [validateJWT], ctrl.list_activities);

module.exports = router;
