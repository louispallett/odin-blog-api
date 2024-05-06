const express = require("express");
const router = express.Router();

const post_controller = require("../Controllers/postController");
const verifyToken = require("../config/verifyToken");

router.get("/", verifyToken, post_controller.post_list);

router.get("/:id", verifyToken, post_controller.post_detail);

router.get("/create", verifyToken, post_controller.new_article_get);

router.post("/create", verifyToken, post_controller.new_article_post);

router.get("/:id/delete", verifyToken, post_controller.delete_get);

router.post("/:id/delete", verifyToken, post_controller.delete_post);



module.exports = router;