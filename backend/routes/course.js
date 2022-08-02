const { Router } = require("express");
const { validateJWT } = require("../middlewares/authenticated");
const ctrl = require("../controllers/course");
const router = Router();

const multiparty = require("connect-multiparty");
const path = multiparty({ uploadDir: "./uploads/courses" });

//[ http://localhost:3000/api/course ]
router.post("/create_course", [validateJWT, path], ctrl.create_course);
router.get("/read_courses", [validateJWT], ctrl.read_courses);
router.get("/read_course_by_id/:id", [validateJWT], ctrl.read_course_by_id);
router.put("/update_course/:id", [validateJWT, path], ctrl.update_course);
router.delete("/delete_course/:id", [validateJWT], ctrl.delete_course);
router.put("/change_status/:id", [validateJWT], ctrl.change_status);
router.get("/image/:img", ctrl.image);
router.get("/list_courses", [validateJWT], ctrl.list_courses);

module.exports = router;
