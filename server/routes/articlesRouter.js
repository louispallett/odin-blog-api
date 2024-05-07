const express = require("express");
const router = express.Router();

const article_controller = require("../Controllers/articleController");
const verifyToken = require("../config/verifyToken");

router.get("/", verifyToken, article_controller.article_list);

router.get("/:id", verifyToken, article_controller.article_detail);

// Possibly redundant?
router.get("/create", verifyToken, article_controller.new_article_get);

router.post("/create", verifyToken, article_controller.new_article_post);

router.get("/:id/delete", verifyToken, article_controller.delete_article_get);

router.post("/:id/delete", verifyToken, article_controller.delete_article_post);

module.exports = router;