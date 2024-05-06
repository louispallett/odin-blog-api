const express = require("express");
const router = express.Router();

const post_controller = require("../Controllers/postController");

router.get("/", post_controller.post_list);

router.get("/:id", post_controller.post_detail);

router.get("/create", post_controller.new_post_get);

router.post("/create", post_controller.new_post_post);

router.get("/:id/delete", post_controller.delete_get);

router.post("/:id/delete", post_controller.delete_post);


module.exports = router;