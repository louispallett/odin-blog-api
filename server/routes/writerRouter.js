const express = require("express");
const router = express.Router();

const writer_controller = require("../Controllers/writerController");

router.post("/sign-in", writer_controller.writer_sign_in);

router.post("/sign-up", writer_controller.writer_sign_up);

router.get("/verify", writer_controller.verify_writer);

module.exports = router;