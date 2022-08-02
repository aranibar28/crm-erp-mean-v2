const { Router } = require("express");
const { validateJWT } = require("../middlewares/authenticated");
const ctrl = require("../controllers/collaborator");
const router = Router();
const multiparty = require("connect-multiparty");
const path = multiparty({ uploadDir: "./uploads/collaborators" });

//[ http://localhost:3000/api/collaborator ]
router.post("/create_collaborator", [validateJWT, path], ctrl.create_collaborator);
router.get("/read_collaborators", [validateJWT], ctrl.read_collaborators);
router.get("/read_collaborator_by_id/:id", [validateJWT], ctrl.read_collaborator_by_id);
router.put("/update_collaborator/:id", [validateJWT, path], ctrl.update_collaborator);
router.delete("/delete_collaborator/:id", [validateJWT], ctrl.delete_collaborator);
router.put("/change_status/:id", [validateJWT], ctrl.change_status);
router.get("/image/:img", ctrl.image);

module.exports = router;
