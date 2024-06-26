const express = require("express");
/*  
NOTE: Since we use parameters ACROSS both the app.use in app.js and HERE - we need to set mergeParams to true, like below.  
Otherwise, our functions will throw errors.
*/
const router = express.Router({ mergeParams: true });

const comment_controller = require("../Controllers/commentController");

router.get("/", comment_controller.comment_list);

router.get("/create", comment_controller.new_comment_get);

router.post("/create", comment_controller.new_comment_post);

router.get("/:id", comment_controller.comment_detail);

router.get("/:id/delete", comment_controller.delete_get);

router.post("/:id/delete", comment_controller.delete_post);


module.exports = router;