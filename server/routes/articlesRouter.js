const express = require("express");
const router = express.Router();
const upload = require("../config/multer"); 

const article_controller = require("../Controllers/articleController");

router.get("/", article_controller.article_list);

router.get("/writers_articles", article_controller.writer_article_list)

router.post("/create_article", upload.single("banner"), article_controller.new_article_post);

router.get("/:id", article_controller.article_detail);

router.post("/:id/update", upload.single("banner"), article_controller.update);

router.post("/:id/publish", article_controller.publish);

router.get("/:id/delete", article_controller.delete_article_get);

router.post("/:id/delete", article_controller.delete_article_post);

module.exports = router;