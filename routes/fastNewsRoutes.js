const express = require("express");
const router = express.Router();
const fastnewsController = require("../controllers/fastNewsController");
const auth = require("../auth");

router.get("/", fastnewsController.getAllFastNews);
router.get("/:id", fastnewsController.getFastNewsById);
router.post("/", auth.authorize, fastnewsController.createFastNews);

module.exports = router;
