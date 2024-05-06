const express = require("express");
const router = express.Router();

const comment_controller = require("../Controllers/commentController");

router.get("/", comment_controller.comment_list);

router.get("/:id", comment_controller.comment_detail);

router.get("/create", comment_controller.new_comment_get);

router.post("/create", comment_controller.new_comment_post);

router.get("/:id/delete", comment_controller.delete_get);

router.post("/:id/delete", comment_controller.delete_post);


module.exports = router;