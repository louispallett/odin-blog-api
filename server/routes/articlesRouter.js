const express = require("express");
const router = express.Router();

const article_controller = require("../Controllers/articleController");
const verifyToken = require("../config/verifyToken");

router.get("/", article_controller.article_list);

router.get("/writers_articles", article_controller.writer_article_list)

// Not redundant - we need to verify their token to allow them onto this page!
router.get("/create", article_controller.new_article_get);

router.post("/create_article", article_controller.new_article_post);

router.get("/:id", article_controller.article_detail);

router.get("/:id/delete", article_controller.delete_article_get);

router.post("/:id/delete", article_controller.delete_article_post);

module.exports = router;