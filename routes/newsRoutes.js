const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const auth = require("../auth");
router.get("/", newsController.getAllNews);
router.get("/:id", newsController.getNewsById);
router.post("/", auth.authorize, newsController.createNews);
router.post("/views", newsController.countViews);

module.exports = router;
